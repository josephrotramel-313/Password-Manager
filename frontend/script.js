let rot = 0
const formToAddPassword = document.querySelector(".formToAddPassword")
const signUpForm = document.querySelector("#formToSignUp")
const signInForm = document.querySelector("#formToSignIn")
const signUpBtn = document.querySelector(".signUpBtn")
const signInBtn = document.querySelector(".signInBtn")
const pfpCont = document.querySelector(".pfpCont")
const pfp = document.querySelector(".pfp")
let isLoggedIn = false


function signInButtonClicked() {
    document.querySelector("#formToSignIn").style.display = "block"
}
function signUpButtonClicked() {
    document.querySelector("#formToSignUp").style.display = "block"
}

document.querySelector(".signInBtn").addEventListener('click', signInButtonClicked)
document.querySelector(".signUpBtn").addEventListener('click', signUpButtonClicked)


//addPasswordForm toggle functionality
function formToAddPasswordToggle() {
    if(rot === 0){
        formToAddPassword.style.display = "flex"
        rot = 1
    } else{
        formToAddPassword.style.display = "none"
        rot = 0
    }
}

document.querySelector(".signInX").addEventListener('click', () => {signInForm.style.display = "none"})
document.querySelector(".signUpX").addEventListener('click', () => {signUpForm.style.display = "none"})

function greeting(username) {
  isLoggedIn = true
  signInBtn.style.display = "none"
  signUpBtn.style.display = "none"
  pfpCont.style.display = "flex"
  const greeting = document.querySelector(".greeting");
  greeting.style.display = "flex";
  greeting.textContent = `Welcome ${username}`;
  pfp.textContent = username
  document.querySelector(".noPasswordsError").textContent = "Press the + to add a password"


  setTimeout(() => {
    greeting.style.display = "none";
  }, 3000);


}


signUpForm.addEventListener("submit", async (e) => {
    e.preventDefault()
    isLoggedIn = true
    signInBtn.style.display = "none"
    signUpBtn.style.display = "none"
    pfpCont.style.display = "flex"


  const formData = new FormData(signUpForm)

  const data = {
    email: formData.get("email"),
    username: formData.get("username"),
    password: formData.get("password")
  }

  const response = await fetch("/signup", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(data)
  })

  const result = await response.json()



  const username = result.savedUser.username
  const password = result.savedUser.password
  const email = result.savedUser.email

  greeting(username)

  signUpForm.style.display = "none"
})





signInForm.addEventListener("submit", async (e) => {
  e.preventDefault()



  const formData = new FormData(signInForm)

  const data = {
    username: formData.get("username"),
    password: formData.get("password")
  }



try {
  const response = await fetch("/signin", {
   method: "POST",
   headers: {
     "Content-Type": "application/json"
   },
   body: JSON.stringify(data)
 })

  const result = await response.json()

  if(response.ok){
    const token = result.token
    localStorage.setItem("token", token)
    const username = result.username
    const password = result.password
    const email = result.email
    signInForm.style.display = "none"
    greeting(username)

  } else {
    const error = result.message

    document.querySelector(".signinError").textContent = error
    document.querySelector(".signinError").style.display = "block"
    signInForm.style.display = "block"
  }

} catch (error) {
  console.error(error)
}
 


})