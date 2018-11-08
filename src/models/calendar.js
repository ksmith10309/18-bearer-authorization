import mongoose from 'mongoose';

// Define schema
const calendarSchema = new mongoose.Schema({
  month: { type: String, required: true },
  date: { type: String, required: true },
  note: { type: String, required: true },
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'users' },
});

// Create model
const Calendar = mongoose.model('Calendar', calendarSchema);

// Console log calendar database contents
Calendar.find(function (err, calendar) {
  if (err) return console.error(err);
  console.log('CALENDAR DATABASE CONTENTS', calendar);
});

// Export model
export default Calendar;
