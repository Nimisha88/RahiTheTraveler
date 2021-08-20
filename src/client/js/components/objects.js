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

export { UserEntry }
