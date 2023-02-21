var firebaseConfig = {
  apiKey: "AIzaSyAY70xD061lRlnqoZ21NfoF-7y7ZMCbW-s",
  authDomain: "wordscramblelolevent2game.firebaseapp.com",
  projectId: "wordscramblelolevent2game",
  storageBucket: "wordscramblelolevent2game.appspot.com",
  messagingSenderId: "829581297358",
  appId: "1:829581297358:web:318cd4824297ea94de729f"
};
firebase.initializeApp(firebaseConfig);
const auth = firebase.auth()
const database = firebase.database()

function register () {
  email = document.getElementById('email').value
  password = document.getElementById('password').value
  full_name = document.getElementById('full_name').value
  if (validate_email(email) == false || validate_password(password) == false) {
    alert('Email or Password is empty!!')
    return
  }
  if (validate_field(full_name) == false) {
    alert('One or More Extra Fields empty!!')
    return
  }
 
  auth.createUserWithEmailAndPassword(email, password)
  .then(function() {
    var user = auth.currentUser

    var database_ref = database.ref()

    var user_data = {
      email : email,
      full_name : full_name,
      last_login : Date.now()
    }

    database_ref.child('users/' + user.uid).set(user_data)

    alert('Registration Success')
    
    window.location.href = 'index.html'

  })
  .catch(function(error) {
    var error_code = error.code
    var error_message = error.message

    alert(error_message)
  })
}

function login () {
  email = document.getElementById('email').value
  password = document.getElementById('password').value

  if (validate_email(email) == false || validate_password(password) == false) {
    alert('Email or Password is empty!!')
    return
  }

  auth.signInWithEmailAndPassword(email, password)
  .then(function() {
    var user = auth.currentUser

    var database_ref = database.ref()

    var user_data = {
      last_login : Date.now()
    }

    database_ref.child('users/' + user.uid).update(user_data, function(error) {
    if (error) {
      var error_message = error.message
      alert(error_message)
    } else {
      alert('Login Success!!')
      window.location.href = 'https://learnenglish.britishcouncil.org/vocabulary/vocabulary-games/wordshake'
    }
  })

})
  .catch(function(error) {
    var error_code = error.code
    var error_message = error.message

    alert(error_message)
  })
}




function validate_email(email) {
  expression = /^[^@]+@\w+(\.\w+)+\w$/
  if (expression.test(email) == true) {
    return true
  } else {
    return false
  }
}

function validate_password(password) {
  if (password < 6) {
    return false
  } else {
    return true
  }
}

function validate_field(field) {
  if (field == null) {
    return false
  }

  if (field.length <= 0) {
    return false
  } else {
    return true
  }
}