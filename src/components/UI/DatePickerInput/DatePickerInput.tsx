'use client';

import { useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import styles from './DatePickerInput.module.css';
import { addMonths } from 'date-fns';

export default function DatePickerInput() {
  const [date, setDate] = useState<Date | null>(null);

  return (
    <div className={styles.wrapper}>
      <DatePicker
        selected={date}
        onChange={(date) => setDate(date)}
        dateFormat="dd.MM.yyyy"
        placeholderText="Booking date*"
        className={styles.input}
        popperPlacement="bottom-start"
        calendarClassName={styles.calendar}
        minDate={new Date()} // Disallows past dates
        maxDate={addMonths(new Date(), 6)} // allows selection only within 6 months
      />
    </div>
  );
}
