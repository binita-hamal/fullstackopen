// import mongoose from 'mongoose'
// //qzMMxN6jLzNWxqB3

// if (process.argv.length === 3) {
//   Person.find({}).then((res) => {
//     console.log("phonebook:");

//     res.forEach((person) => {
//       console.log(`${person.name} ${person.number}`);
//     });
//     mongoose.connection.close();
//   });
// } else if (process.argv.length === 5) {
//   const person = new Person({
//     name: name,
//     number: number,
//   });

//   person.save().then(() => {
//     console.log(`added ${name} number ${number} to phonebook`);
//     mongoose.connection.close();
//   });
// }
