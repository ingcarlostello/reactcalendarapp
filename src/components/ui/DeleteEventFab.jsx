import React from 'react';
import { useDispatch } from 'react-redux';
import { eventStartDelete } from '../../actions/eventsCalendar';

const DeleteEventFab = () => {

    const dispatch = useDispatch()

    const handleDelete = () => {
      dispatch(eventStartDelete())
    }


    return (
        <button className="btn btn-danger fab-danger" onClick={handleDelete}>
            <i className="fas fa-trash"></i>
            <span> Delete Event</span>
        </button>
    );
};

export default DeleteEventFab;