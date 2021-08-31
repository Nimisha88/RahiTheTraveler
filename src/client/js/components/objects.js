// ----------------------------------------------------------------------------
// Client Side Data Objects
// ----------------------------------------------------------------------------
// UserEntry(destination, startDate) - User Input
// ObjName.prototype.varName =  or ObjName.prototype.fnName = function() {}
// ----------------------------------------------------------------------------

function UserEntry(destination, startDate) {
  this.destination = destination;
  this.startDate = startDate;
}

function FlightTicket(fromPlace, fromDate, fromTime, toPlace, toDate, toTime) {
  this.fromPlace = fromPlace;
  this.fromDate = fromDate;
  this.fromTime = fromTime;
  this.toPlace = toPlace;
  this.toDate = toDate;
  this.toTime = toTime;
}

function PackingItem(id, name, isPacked=false) {
  this.id = id;
  this.name = name;
  this.isPacked = isPacked;
}

export { UserEntry, FlightTicket, PackingItem }
