let rot = 0
const formToAddPassword = document.querySelector(".formToAddPassword")
const signUpForm = document.querySelector("#formToSignUp")
const signInForm = document.querySelector("#formToSignIn")
const signUpBtn = document.querySelector(".signUpBtn")
const signInBtn = document.querySelector(".signInBtn")
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



signUpForm.addEventListener("submit", async (e) => {
    e.preventDefault()
    isLoggedIn = true
    signInBtn.style.display = "none"
    signUpBtn.style.display = "none"
    pfp.style.display = "block"


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


  console.log("username: " + result.savedUser.username + "password" + result.savedUser.password)
  const username = result.savedUser.username
  const password = result.savedUser.password
  const email = result.savedUser.email

    const welcomeEl = document.querySelector(".welcome");
    const greeting = document.querySelector(".greeting");
    greeting.style.display = "flex";
    greeting.textContent = `Welcome ${username}`;


    setTimeout(() => {
      greeting.style.display = "none";
    }, 3000);

  signUpForm.style.display = "none"
})


