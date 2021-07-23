import React, { useEffect, useState } from "react";
import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import Navbar from "../ui/Navbar";
import { messages } from "../../helpers/calendarLanguage";
import "react-big-calendar/lib/css/react-big-calendar.css";
import CalendarEvent from "./CalendarEvent";
import CalendarModal from "./CalendarModal";
import { useDispatch, useSelector } from "react-redux";
import { uiOpenModal } from "../../actions/ui";
import { eventClearActiveEvent, eventSetActive, eventStartLoading } from "../../actions/eventsCalendar";
import AddNewFab from "../ui/AddNewFab";
import DeleteEventFab from "../ui/DeleteEventFab";

const localizer = momentLocalizer(moment); // or globalizeLocalizer

const CalendarScreen = () => {
  const dispatch = useDispatch();
  const {events, activeEvent} = useSelector(state => state.calendar)

  const {uid} = useSelector(state => state.auth)

  const [lastView, setLastView] = useState(
    localStorage.getItem("lastView") || "month"
  );

  useEffect(() => {
    dispatch(eventStartLoading()) // --> el argumento necesario es el token
  }, [dispatch])

  const onDoubleClick = () => {
    dispatch(uiOpenModal());
  };

  const onSelectEvent = (e) => {
    dispatch(eventSetActive(e))
  };

  const onViewChange = (e) => {
    setLastView(e);
    localStorage.setItem("lastView", e);
  };

  const onSelectSlot = (e) => {
    dispatch(eventClearActiveEvent())
  }

  const eventStyleGetter = (event, start, end, isSelected) => {



    const style = {
      backgroundColor: (uid === event.user._id) ? "#367cf7" : '#465660',
      borderRadius: "0px",
      opacity: 0.8,
      display: "block",
      color: "white",
    };
    return {
      style,
    };
  };

  return (
    <div className="calendar-screen">
      <Navbar />
      <Calendar
        localizer={localizer}
        events={events}
        startAccessor="start"
        endAccessor="end"
        messages={messages}
        eventPropGetter={eventStyleGetter}
        onDoubleClickEvent={onDoubleClick}
        onSelectEvent={onSelectEvent}
        onView={onViewChange}
        onSelectSlot={onSelectSlot}
        selectable={true}
        view={lastView}
        components={{ event: CalendarEvent }}
      />
      <AddNewFab />
      {
        (activeEvent) && <DeleteEventFab />
      }
      <CalendarModal />

    </div>
  );
};

export default CalendarScreen;
