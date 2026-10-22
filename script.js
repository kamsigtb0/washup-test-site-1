const $ = (id) => document.getElementById(id);
const prices = {"Exterior Wash":"₦5,000","Interior Refresh":"₦7,500","Full Detailing":"₦25,000","Engine Bay Clean":"₦10,000"};
const waNumber = ""; // Add Washhup's WhatsApp business number here, including country code, e.g. 2348012345678.
const today = new Date(); today.setMinutes(today.getMinutes()-today.getTimezoneOffset());
const minDate = today.toISOString().slice(0,10);
["quickDate","date"].forEach(id => { $(id).min = minDate; });
$("year").textContent = new Date().getFullYear();

$("menuToggle").addEventListener("click", () => {
  const nav = $("nav"); nav.classList.toggle("open");
  $("menuToggle").setAttribute("aria-expanded", nav.classList.contains("open") ? "true" : "false");
});
document.querySelectorAll("#nav a").forEach(a => a.addEventListener("click", () => $("nav").classList.remove("open")));

function syncSummary() {
  const service = $("service").value;
  $("summaryService").textContent = service;
  $("summaryPrice").textContent = prices[service] || "Confirm price";
}
$("service").addEventListener("change", syncSummary);
document.querySelectorAll(".choose-service").forEach(btn => btn.addEventListener("click", () => {
  $("service").value = btn.dataset.service; syncSummary(); $("booking").scrollIntoView({behavior:"smooth"});
}));
$("quickForm").addEventListener("submit", e => {
  e.preventDefault();
  $("service").value = $("quickService").value;
  $("location").value = $("quickLocation").value;
  $("date").value = $("quickDate").value;
  syncSummary();
  $("booking").scrollIntoView({behavior:"smooth"});
});
$("bookingForm").addEventListener("submit", e => {
  e.preventDefault();
  const fields = {
    name: $("fullName").value.trim(), phone: $("phone").value.trim(),
    service: $("service").value, vehicle: $("vehicle").value.trim(),
    date: $("date").value, time: $("time").value,
    location: $("location").value.trim(), notes: $("notes").value.trim()
  };
  if (!Object.values(fields).slice(0,8).every(Boolean)) return;
  const message = `Hello Washhup! I'd like to request a car wash booking.\n\nName: ${fields.name}\nPhone: ${fields.phone}\nVehicle: ${fields.vehicle}\nService: ${fields.service}\nStarting price: ${prices[fields.service]}\nPreferred date: ${fields.date}\nPreferred time: ${fields.time}\nLocation: ${fields.location}\nExtra notes: ${fields.notes || "None"}\n\nPlease confirm availability and final price.`;
  const url = waNumber ? `https://wa.me/${waNumber}?text=${encodeURIComponent(message)}` : `https://wa.me/?text=${encodeURIComponent(message)}`;
  $("formMessage").textContent = waNumber ? "Opening WhatsApp with your booking details…" : "Opening WhatsApp. Add Washhup's business number in script.js to direct requests to the official account.";
  window.open(url, "_blank", "noopener,noreferrer");
});
syncSummary();
