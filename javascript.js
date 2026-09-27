const viewExampleButton = document.getElementById("view-example");

if (viewExampleButton) {
  viewExampleButton.addEventListener("click", function () {
    window.open("html2.html", "_blank");
  });
}

const packageButtons = document.querySelectorAll(".package");
const printSizeSelect = document.getElementById("print-size");
const additionalImagesInput = document.getElementById("additional-images");
const selectedPackageEl = document.getElementById("selected-package");
const imageCountEl = document.getElementById("image-count");
const orderTotalEl = document.getElementById("order-total");
const orderMessageEl = document.getElementById("order-message");
const orderNowButton = document.getElementById("order-now");
const checkoutForm = document.querySelector(".checkout-form");

let selectedPackagePrice = 350;
let selectedPackageName = "Portrait Session";

function updateOrderSummary() {
  if (!selectedPackageEl || !orderTotalEl || !imageCountEl || !orderMessageEl || !printSizeSelect || !additionalImagesInput) {
    return;
  }

  const extraPrintCost = Number(printSizeSelect.value || 0);
  const extraImages = Number(additionalImagesInput.value || 0);
  const extraImageCost = extraImages * 25;
  const total = selectedPackagePrice + extraPrintCost + extraImageCost;

  selectedPackageEl.textContent = selectedPackageName;
  imageCountEl.textContent = extraImages;
  orderTotalEl.textContent = "$" + total;
  orderMessageEl.textContent = "Ready to reserve your session.";
}

packageButtons.forEach(function (button) {
  button.addEventListener("click", function () {
    packageButtons.forEach(function (item) {
      item.classList.remove("active");
    });

    button.classList.add("active");
    selectedPackageName = button.dataset.name || "Portrait Session";
    selectedPackagePrice = Number(button.dataset.price || 350);
    updateOrderSummary();
  });
});

if (printSizeSelect) {
  printSizeSelect.addEventListener("change", updateOrderSummary);
}

if (additionalImagesInput) {
  additionalImagesInput.addEventListener("input", updateOrderSummary);
}

if (orderNowButton) {
  orderNowButton.addEventListener("click", function () {
    if (orderMessageEl) {
      orderMessageEl.textContent = selectedPackageName + " added to cart successfully.";
    }
  });
}

if (checkoutForm) {
  checkoutForm.addEventListener("submit", function (event) {
    event.preventDefault();
    const button = checkoutForm.querySelector("button[type='submit']");

    if (button) {
      button.textContent = "Order placed";
      button.disabled = true;
    }

    if (orderMessageEl) {
      orderMessageEl.textContent = "Your order is confirmed. We will contact you shortly.";
    }
  });
}

updateOrderSummary();