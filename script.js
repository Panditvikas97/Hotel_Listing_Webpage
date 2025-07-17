const form = document.getElementById('hotelForm');
const hotelList = document.getElementById('hotelList');
const cancelEditBtn = document.getElementById('cancelEdit');
let editHotelId = null;

const fetchHotels = async () => {
  const res = await fetch('http://localhost:3000/hotels');
  const hotels = await res.json();
  hotelList.innerHTML = '';
  hotels.forEach(hotel => {
    const div = document.createElement('div');
    div.className = 'hotel-card';
    div.innerHTML = `
      <strong>${hotel.name}</strong><br/>
      Location: ${hotel.location}<br/>
      Rating: ${hotel.rating}<br/>
      Price: ₹${hotel.price}<br/>
      Description: ${hotel.description}<br/>
      <button onclick="editHotel(${hotel.id}, '${hotel.name}', '${hotel.location}', ${hotel.rating}, ${hotel.price}, \`${hotel.description}\`)">Edit</button>
    `;
    hotelList.appendChild(div);
  });
};

form.onsubmit = async (e) => {
  e.preventDefault();
  const data = {
    name: form.name.value,
    location: form.location.value,
    rating: form.rating.value,
    price: form.price.value,
    description: form.description.value,
  };

  const method = editHotelId ? 'PUT' : 'POST';
  const url = editHotelId ? `http://localhost:3000/hotels/${editHotelId}` : 'http://localhost:3000/hotels';

  await fetch(url, {
    method,
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });

  form.reset();
  editHotelId = null;
  cancelEditBtn.style.display = 'none';
  fetchHotels();
};

cancelEditBtn.onclick = () => {
  editHotelId = null;
  form.reset();
  cancelEditBtn.style.display = 'none';
};

window.editHotel = (id, name, location, rating, price, description) => {
  editHotelId = id;
  form.name.value = name;
  form.location.value = location;
  form.rating.value = rating;
  form.price.value = price;
  form.description.value = description;
  cancelEditBtn.style.display = 'inline';
};

document.addEventListener('DOMContentLoaded', fetchHotels);
