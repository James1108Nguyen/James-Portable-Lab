// ===========================
// Global Variables & Constants
// ===========================
const root = document.documentElement;
let baseHeaderHeight =
  getComputedStyle(root).getPropertyValue("--header-height");
baseHeaderHeight = parseFloat(baseHeaderHeight);
root.style.setProperty(
  "--header-expanded-height",
  baseHeaderHeight + 10 + "px"
);

const scrollbarWidth = window.innerWidth - document.documentElement.clientWidth;
root.style.setProperty("--scrollbar-width", `${scrollbarWidth}px`);

let isHomeShrunk = false; // Biến trạng thái để kiểm soát khi home giảm còn 50%

// ===========================
// Event Listeners
// ===========================

// Sự kiện cuộn trang - xử lý header & section home
window.addEventListener("scroll", handleScroll);

// Sự kiện click vào các liên kết điều hướng
const links = document.querySelectorAll('a[href^="#"]');
links.forEach((link) => {
  link.addEventListener("click", handleNavClick);
});

// Mở/đóng sidebar
const openBtn = document.getElementById("openSidebarBtn");
const closeBtn = document.querySelector(".sidebar__close-btn");
const overlay = document.getElementById("overlay");
openBtn.addEventListener("click", openSidebar);
closeBtn.addEventListener("click", closeSidebar);
overlay.addEventListener("click", closeSidebar);

// Thực hiện các cập nhật thời gian và thời tiết
window.onload = function () {
  updateWeather();
  setInterval(updateWeather, 600000); // 10 phút cập nhật thời tiết 1 lần
  setInterval(updateTime, 1000); // Cập nhật thời gian mỗi giây
};

// ===========================
// Scroll Functions
// ===========================

// Xử lý sự kiện cuộn trang
function handleScroll() {
  const homeSection = document.getElementById("home");
  const maxHeight = window.innerHeight;
  const scrollPosition = window.scrollY;
  const scrollThreshold = maxHeight * 0.4;
  const minHeight = maxHeight * 0.5;

  if (scrollPosition >= scrollThreshold) {
    homeSection.style.height = `${minHeight}px`;
  } else {
    const newHeight =
      maxHeight - (scrollPosition / scrollThreshold) * (maxHeight - minHeight);
    homeSection.style.height = `${newHeight}px`;
  }

  handleHeaderState();
  handleHomeContentOpacity(scrollPosition, maxHeight);
  highlightActiveNavLink();
}

// Xử lý trạng thái của header
function handleHeaderState() {
  const header = document.getElementById("header");
  const triggerPoint = 20;

  if (window.scrollY > triggerPoint) {
    header.classList.add("fixed");
    header.classList.remove("expanded");
  } else {
    header.classList.remove("fixed");
    header.classList.add("expanded");
  }
}

// Điều chỉnh độ mờ cho nội dung của home
function handleHomeContentOpacity(scrollPosition, maxHeight) {
  const homeContent = document.querySelector("#home .home__info");
  const opacityValue = Math.max(1 - scrollPosition / (maxHeight * 0.38), 0);
  homeContent.style.opacity = opacityValue;
}

// Đánh dấu liên kết điều hướng active
function highlightActiveNavLink() {
  const sections = document.querySelectorAll("section");
  const navLinks = document.querySelectorAll(
    ".nav-list__item a, .sidebar__nav a"
  );

  sections.forEach((section) => {
    const rect = section.getBoundingClientRect();

    if (rect.top <= 150 && rect.bottom >= 150) {
      const sectionId = section.getAttribute("id");

      navLinks.forEach((link) => {
        link.classList.remove("active");
      });

      navLinks.forEach((link) => {
        if (link.getAttribute("href").includes(sectionId)) {
          link.classList.add("active");
        }
      });
    }
  });
}

// ===========================
// Navigation Click Handler
// ===========================

function handleNavClick(e) {
  e.preventDefault();

  const targetId = this.getAttribute("href");
  const targetElement = document.querySelector(targetId);
  const homeSection = document.getElementById("home");
  const homeHeight = parseFloat(window.getComputedStyle(homeSection).height);
  const maxHeight = window.innerHeight;

  const offsetPosition =
    targetElement.getBoundingClientRect().top -
    (homeHeight - maxHeight * 0.5) -
    baseHeaderHeight;
  window.scrollBy({ top: offsetPosition, behavior: "smooth" });
}

// ===========================
// Time and Weather Functions
// ===========================

// Cập nhật thời gian hiện tại
function updateTime() {
  const options = {
    timeZone: "Asia/Ho_Chi_Minh",
    hour12: true,
    hour: "numeric",
    minute: "numeric",
    second: "numeric",
  };
  const timeFormat = new Intl.DateTimeFormat([], options);
  const currentTime = timeFormat.format(new Date());

  const timeElements = document.getElementsByClassName("time");
  for (let i = 0; i < timeElements.length; i++) {
    timeElements[i].textContent = currentTime;
  }
}

// Cập nhật thời tiết (sử dụng dữ liệu giả lập, vẫn giữ APIKEY để sử dụng sau này)
function updateWeather() {
  const data = [{ temp: 29.4 }];
  const temperature = data[0].temp;
  const weatherElement = document.getElementsByClassName("weather");
  for (let i = 0; i < weatherElement.length; i++) {
    weatherElement[i].textContent = `${temperature}°C`;
  }

  // Future usage with real API
  // const apiKey = "8835170ea31a43c3be19900b1d5ed54c";
  // const lat = "10.762622";
  // const lon = "106.660172";
  // const url = `https://api.weatherbit.io/v2.0/current?lat=${lat}&lon=${lon}&key=${apiKey}`;
  // fetch(url)
  //   .then(response => response.json())
  //   .then(data => {
  //     const temperature = data.data[0].temp;
  //     const weatherElement = document.getElementById("weather");
  //     weatherElement.textContent = `Nhiệt độ hiện tại: ${temperature}°C`;
  //   })
  //   .catch(error => console.error("Lỗi khi lấy dữ liệu thời tiết:", error));
}

// ===========================
// Slider Functions
// ===========================

function showSlides(sliderId, index) {
  const slider = document.getElementById(sliderId);
  const slides = slider.getElementsByClassName("slide");
  const dots = slider.getElementsByClassName("dot");

  if (index >= slides.length) {
    slider.currentSlideIndex = 0;
  } else if (index < 0) {
    slider.currentSlideIndex = slides.length - 1;
  } else {
    slider.currentSlideIndex = index;
  }

  for (let i = 0; i < slides.length; i++) {
    slides[i].classList.remove("active");
  }

  for (let i = 0; i < dots.length; i++) {
    dots[i].classList.remove("active");
  }

  slides[slider.currentSlideIndex].classList.add("active");
  dots[slider.currentSlideIndex].classList.add("active");
}

// Tự động chuyển slide
function autoSlide(sliderId) {
  const slider = document.getElementById(sliderId);
  slider.currentSlideIndex = 0;

  slider.autoSlideInterval = setInterval(function () {
    showSlides(sliderId, slider.currentSlideIndex + 1);
  }, 2200);
}

// Hiển thị slide hiện tại và dừng tự động chuyển khi người dùng tương tác
function currentSlide(sliderId, n) {
  clearInterval(document.getElementById(sliderId).autoSlideInterval);
  showSlides(sliderId, n - 1);
  autoSlide(sliderId);
}

// Khởi tạo slider cho các project khác nhau
autoSlide("slider-project-1");
autoSlide("slider-project-2");

// ===========================
// Sidebar Functions
// ===========================

// Mở sidebar và hiển thị overlay
function openSidebar() {
  const sidebar = document.getElementById("sidebar");
  sidebar.classList.add("open");
  overlay.classList.add("show");
}

// Đóng sidebar và ẩn overlay
function closeSidebar() {
  const sidebar = document.getElementById("sidebar");
  sidebar.classList.remove("open");
  overlay.classList.remove("show");
}
