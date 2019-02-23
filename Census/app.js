// Initialize Firebase
var config = {
    apiKey: "AIzaSyAjVrN9SUpNweYSLOS46JDP2nZYb3-_9E4",
    authDomain: "fir-v1-390aa.firebaseapp.com",
    databaseURL: "https://fir-v1-390aa.firebaseio.com",
    projectId: "fir-v1-390aa",
    storageBucket: "fir-v1-390aa.appspot.com",
    messagingSenderId: "352082910532"
  };
  firebase.initializeApp(config);

//Reference census collection
var censusRef = firebase.database().ref('census');

//Listen for form submit
document.getElementById('survey-form').addEventListener('submit', submitForm);

//Submit Form
function submitForm(e){
    e.preventDefault();

    //get values
    var name = document.getElementById('name').value;
    var number = getInputVal('number');
    var email = getInputVal('email');
    var age = getInputVal('age');
    var address = getInputVal('address');
    var occupants = getInputVal('occupants');
    var dop = getInputVal('dob');
    var dropdown = getInputVal('dropdown');
    var race = getValue();
    var comment = getInputVal('comments');
    var origin = getValueR();
  
  
    //Call saveCensus function
    saveCensus(name, number, email, age, address, occupants, dop, dropdown, race, comment, origin);

    //Show confirmation alert
    document.querySelector('.alert').style.display = 'block';

    //Hide alert after 3s
    setTimeout(function(){
        document.querySelector('.alert').style.display = 'none';
    }, 5000)

    //Clear form data
    document.getElementById('survey-form').reset();
};

//function to get form values
function getInputVal(id){
    return document.getElementById(id).value;
};

//get values from checkboxes
function getValue(){
    var checks = document.getElementsByClassName('checks');
    var str='';
    for(let i =0; i < 13; i++){
      if (checks[i].checked === true){
        str += checks[i].value + ' ';
      }
    }
  return str;
};

//get values from radio buttons
function getValueR(){
    var origins = document.getElementsByClassName('origins');
    var radioValue='';
    for(let i =0; i < 5; i++){
      if (origins[i].checked === true){
        radioValue += origins[i].value + ' ';
      }
    }
  return radioValue;
};

//Save census to firebase collection
function saveCensus(name, number, email, age, address, occupants, dop, dropdown, race, comment, origin){
    var newCensusRef = censusRef.push();
    newCensusRef.set({
        name: name,
        number: number,
        email: email,
        age: age,
        address: address,
        occupants: occupants,
        dop: dop,
        dropdown: dropdown,
        race: race,
        comment: comment,
        origin: origin
    });
}