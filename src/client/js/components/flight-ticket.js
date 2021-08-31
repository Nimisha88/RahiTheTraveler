/* Example of Flight Ticket
<div class="ticket">
  <div class="ticket-from ticket-div-left">
    <div class="ticket-text">
      <p><i class="fas fa-plane-departure"></i></p>
      <h1>19:27</h1>
      <h6>Aug 17</h6>
      <h6>New Delhi</h6>
    </div>
  </div>
  <div class="ticket-to ticket-div-right">
    <div class="ticket-text">
      <p><i class="fas fa-plane-arrival"></i></p>
      <h1>11:45</h1>
      <h6>Aug 18</h6>
      <h6>New York</h6>
    </div>
  </div>
</div> */


export default (data = {}) => {

  let timeContent;
  timeContent = (new Date(data.fromDate)).toUTCString().split(' ');
  let fromDate = `${timeContent[2]} ${timeContent[1]}`;
  timeContent = (new Date(data.toDate)).toUTCString().split(' ');
  let toDate = `${timeContent[2]} ${timeContent[1]}`;

  let ticket = document.createElement('div'); ticket.classList.add('ticket');
  let ticketFrom = document.createElement('div'); ticketFrom.classList.add('ticket-from', 'ticket-div-left');
  let ticketTo = document.createElement('div'); ticketTo.classList.add('ticket-to', 'ticket-div-right');

  try {
    ticketFrom.appendChild(generateTicketText('departure', data.fromTime, fromDate, data.fromPlace));
    ticketTo.appendChild(generateTicketText('arrival', data.toTime, toDate, data.toPlace));
  }
  catch(error) {
    console.log('******************** Flight Ticket Error ******************** \n', error);
    return ticket; //For Jest Test
  }

  ticket.appendChild(ticketFrom);
  ticket.appendChild(ticketTo);

  return ticket;
}

function generateTicketText(toOrFrom, time, date, place) {
  let ticketText = document.createElement('div'); ticketText.classList.add('ticket-text');
  let iconPara = document.createElement('p');
  let iconEle = document.createElement('i'); iconEle.classList.add('fas', `fa-plane-${toOrFrom}`);
  let timeEle = document.createElement('h1'); timeEle.innerHTML = time;
  let dateEle = document.createElement('h6'); dateEle.innerHTML = date;
  let placeEle = document.createElement('h6'); placeEle.innerHTML = place;

  iconPara.appendChild(iconEle);
  ticketText.appendChild(iconPara);
  ticketText.appendChild(timeEle);
  ticketText.appendChild(dateEle);
  ticketText.appendChild(placeEle);

  return ticketText;
}
