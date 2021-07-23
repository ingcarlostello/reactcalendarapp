// packages
import DateTimePicker from "react-datetime-picker";
import Modal from "react-modal";
import moment from "moment";
import React, { useEffect, useState } from "react";
import Swal from "sweetalert2";
import { useDispatch, useSelector } from "react-redux";

// scripts
import { uiCloseModal } from "../../actions/ui";
import { eventStartAddNew, eventClearActiveEvent, eventStartUpdate } from "../../actions/eventsCalendar";

const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
  },
};
Modal.setAppElement("#root");

const now = moment().minutes(0).seconds(0).add(1, "hours");
const nowPlusOneHour = now.clone().add(1, "hours");

const initEvent = {
  title: '',
  notes: '',
  start: now.toDate(),
  end: nowPlusOneHour.toDate()

}

const CalendarModal = () => {
  const { modalOpen } = useSelector((state) => state.ui); //ui esta en el root reducer, es el objeto
  const { activeEvent } = useSelector((state) => state.calendar); //ui esta en el root reducer, es el objeto
  const dispatch = useDispatch();
  const [dateStart, setDateStart] = useState(now.toDate());
  const [dateEnd, setDateEnd] = useState(nowPlusOneHour.toDate());
  const [titleValid, setTitleValid] = useState(true);
  const [calendarFormValues, setCalendarFormValues] = useState(initEvent);
  const { title, notes, start, end } = calendarFormValues;

  useEffect(() => {
    if(activeEvent){
      setCalendarFormValues(activeEvent)
    }
    else{
      setCalendarFormValues(initEvent)
    }
  }, [activeEvent, setCalendarFormValues])


  const handleInputChange = ({ target }) => {
    setCalendarFormValues({
      ...calendarFormValues,
      [target.name]: target.value,
    });
  };

  const closeModal = () => {
    dispatch(uiCloseModal());
    dispatch(eventClearActiveEvent())
    setCalendarFormValues(initEvent)
  };

  const handleStartDate = (e) => {
    setDateStart(e);
    setCalendarFormValues({
      ...calendarFormValues,
      start: e,
    });
  };

  const handleEndtDate = (e) => {
    setDateEnd(e);
    setCalendarFormValues({
      ...calendarFormValues,
      end: e,
    });
  };

  const handleSubmitForm = (e) => {
    e.preventDefault();

    const momentStart = moment(start);
    const momentEnd = moment(end);

    // si la fecha de inicio es igual o mayor a la fecha final
    if (momentStart.isSameOrAfter(momentEnd)) {
      return Swal.fire(
        "Error",
        "End date must be higher that Start date",
        "error"
      );
    }

    if (title.trim().length < 2) {
      return setTitleValid(false);
    }
    
    if(activeEvent){
      dispatch(eventStartUpdate(calendarFormValues))
    }else{
      dispatch(eventStartAddNew(calendarFormValues));
    }
  

    setTitleValid(true);

    closeModal();
  };

  return (
    <Modal
      isOpen={modalOpen}
      onRequestClose={closeModal}
      style={customStyles}
      closeTimeoutMS={200}
      className="modal"
      overlayClassName="modal-fondo"
    >
      <h1>{activeEvent ? 'Edit Event' : 'New Event'} </h1>
      <hr />
      <form className="container" onSubmit={handleSubmitForm}>
        <div className="form-group">
          <label>Date and Start Time</label>
          <DateTimePicker
            onChange={handleStartDate}
            value={dateStart}
            className="form-control"
          />
        </div>

        <div className="form-group">
          <label>Date and Finish Time</label>
          <DateTimePicker
            onChange={handleEndtDate}
            value={dateEnd}
            minDate={dateStart}
            className="form-control"
          />
        </div>

        <hr />
        <div className="form-group">
          <label>Title and Notes</label>
          <input
            type="text" //si no es true
            className={`form-control ${!titleValid && "is-invalid"}`}
            placeholder="Title Event"
            name="title"
            autoComplete="off"
            value={title}
            onChange={handleInputChange}
          />
          <small id="emailHelp" className="form-text text-muted">
            A short description
          </small>
        </div>

        <div className="form-group">
          <textarea
            type="text"
            className="form-control"
            placeholder="Notes"
            rows="5"
            name="notes"
            value={notes}
            onChange={handleInputChange}
          ></textarea>
          <small id="emailHelp" className="form-text text-muted">
            Additional information
          </small>
        </div>

        <button type="submit" className="btn btn-outline-primary btn-block">
          <i className="far fa-save"></i>
          <span> Save</span>
        </button>
      </form>
    </Modal>
  );
};

export default CalendarModal;
