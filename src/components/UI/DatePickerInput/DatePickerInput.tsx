'use client';

import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import styles from './DatePickerInput.module.css';
import { addMonths } from 'date-fns';
import { FC } from 'react';

interface DatePickerInputProps {
  value: Date | null;
  onChange: (date: Date | null) => void;
}

const DatePickerInput: FC<DatePickerInputProps> = ({ value, onChange }) => {
  return (
    <div className={styles.wrapper}>
      <DatePicker
        selected={value}
        onChange={(date) => onChange(date)}
        dateFormat="dd.MM.yyyy"
        placeholderText="Booking date*"
        className={styles.input}
        popperPlacement="bottom-start"
        calendarClassName={styles.calendar}
        minDate={new Date()}
        maxDate={addMonths(new Date(), 6)}
      />
    </div>
  );
};

export default DatePickerInput;
