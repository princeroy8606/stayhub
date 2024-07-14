export function isValidEmail(email) {
  if (!email) return false;
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

export function isStrongPassword(password) {
  const hasUpperCase = /[A-Z]/.test(password);
  const hasLowerCase = /[a-z]/.test(password);
  const hasDigit = /\d/.test(password);
  const hasSpecialChar = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(password);
  return (
    hasUpperCase &&
    hasLowerCase &&
    hasDigit &&
    hasSpecialChar &&
    password.length >= 8
  );
}

export function isValidName(name) {
  if (!name) return false;
  if (!/^[a-zA-Z '-]+$/.test(name)) return false;
  if (name.length < 3 || name.length > 20) return false;
  const repetationCheck = () => {
    let count = {};
    for (let i = 0; i < name.length; i++) {
      const letter = name[i];
      count[letter] = (count[letter] || 0) + 1;
      if (count[letter] > 4) return false;
    }
    return true;
  };
  return repetationCheck();
}

export function isValidPhoneNumber(phone) {
  const checkNumbersRepeat = () => {
    let didgitCount = {};
    for (let digit of phone) {
      didgitCount[digit] = (didgitCount[digit] || 0) + 1;
      console.log(didgitCount)
      if (didgitCount[digit] >= 6) return false;
    }
    return true;
  };
  if (!phone) return false;
  if (!/^[789]\d{9}$/.test(phone)) return false;
  if (phone.length !== 10) return false;
  if (phone.length === 10) return checkNumbersRepeat();
  return true;
}

export function isValidAge(dob) {
  if (!dob) return false;
  const givenDate = new Date(dob?.$d);
  const currentDate = new Date();
  const differenceMs = currentDate - givenDate;
  const years = Math.floor(differenceMs / (1000 * 60 * 60 * 24 * 365));
  if (years < 18 || years > 100) return false;
  return true;
}

export function isValidPincode(pincode) {
  if (!pincode) return false;
  if (pincode.length !== 6) return false;
  if (!/^[1-9]\d{5}$/.test(pincode)) return false;
  return true;
}
