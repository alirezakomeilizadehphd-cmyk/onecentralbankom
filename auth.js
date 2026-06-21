// DEMO ONLY — simulated auth flow, no real verification, no backend calls.

function handleLogin(){
  const email = document.getElementById('email').value.trim();
  const pass  = document.getElementById('password').value.trim();
  const btn   = document.getElementById('loginBtn');
  const err   = document.getElementById('errorMsg');

  err.style.display = 'none';

  if(!email || !pass){
    err.textContent = 'Please enter both email and password.';
    err.style.display = 'block';
    return;
  }
  if(!email.includes('@')){
    err.textContent = 'Please enter a valid email address.';
    err.style.display = 'block';
    return;
  }

  btn.disabled = true;
  btn.innerHTML = '<span class="spinner"></span> Verifying...';

  // simulate a verification delay
  setTimeout(() => {
    localStorage.setItem('demo_user_email', email);
    const kycDone = localStorage.getItem('demo_kyc_done');
    window.location.href = kycDone ? 'dashboard.html' : 'kyc.html';
  }, 1100);
}

function requireLogin(){
  if(!localStorage.getItem('demo_user_email')){
    window.location.href = 'index.html';
  }
}

function logout(){
  localStorage.removeItem('demo_user_email');
  localStorage.removeItem('demo_kyc_done');
  window.location.href = 'index.html';
}
