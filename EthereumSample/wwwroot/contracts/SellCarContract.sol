pragma solidity ^0.4.6;
contract SellCarContract {     
    enum Status {
        Owned,
        Sale,
        WaitConfirmation
    } 
     
    struct CarDescription {
        string info;
        uint256 price;
        Status status;
        address owner;
        address potentialOwner;
    }
    
    CarDescription car;
     
	function SellCarContract(string info) {
	    car = CarDescription({
			info: info,
	        price: 10 ether,
	        status: Status.Owned,
	        owner: tx.origin,
	        potentialOwner: 0
	    });
  	}
  	  	
  	function sell(uint256 price) {
  	    if (car.owner != msg.sender) throw;
  	    if (car.status != Status.Owned) throw;
  	    car.price = price;
  	    car.status = Status.Sale;
  	}

  	function buy() {
  	    if (car.status != Status.Sale) throw;
  	    if (car.owner == msg.sender) throw;
  	    car.potentialOwner = msg.sender;
  	    car.status = Status.WaitConfirmation;
  	}
  	
  	function confirm() {
  	    if (car.status != Status.WaitConfirmation) throw;
  	    if (car.owner != msg.sender) throw;
        car.owner = car.potentialOwner;
  	    car.potentialOwner = 0;
  	    car.status = Status.Owned;
  	}
  	
  	function getCar() constant returns(string, uint256, Status, address, address) {
  		return (car.info, car.price, car.status, car.owner, car.potentialOwner);
  	}
}
