const $ = (id) => document.getElementById(id);
const waNumber = "234YOURNUMBER"; // Replace with Washhup's WhatsApp number in international format, digits only.
const bookingMessage = `Hello Washhup! I would like to book a car wash.

Preferred service: Preferred date: Preferred time: Location:

Please let me know your availability and pricing. Thank you.`;
const bookingUrl = `https://wa.me/${waNumber}?text=${encodeURIComponent(bookingMessage)}`;

document.querySelectorAll("[data-whatsapp-booking]").forEach(link => {
  link.href = bookingUrl;
});
$("year").textContent = new Date().getFullYear();

$("menuToggle").addEventListener("click", () => {
  const nav = $("nav"); nav.classList.toggle("open");
  $("menuToggle").setAttribute("aria-expanded", nav.classList.contains("open") ? "true" : "false");
});
document.querySelectorAll("#nav a").forEach(a => a.addEventListener("click", () => $("nav").classList.remove("open")));
