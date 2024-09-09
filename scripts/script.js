// File: script.js

const root = document.documentElement;
let baseHeader = getComputedStyle(root).getPropertyValue("--header-height");
baseHeader = parseFloat(baseHeader);
console.log("Base header height: " + baseHeader);
root.style.setProperty("--header-expanded-height", baseHeader + 20 + "px");
// Blur Header
window.addEventListener("scroll", function () {
  const header = document.getElementById("header");
  const homeSection = document.getElementById("home");
  const homeContent = document.querySelector("#home .home__info");

  const maxHeight = window.innerHeight;
  const scrollPosition = window.scrollY;

  const shrinkHeight = maxHeight - scrollPosition;
  const triggerPoint = 20;
  // const triggerPoint = maxHeight * 0.2;

  // Thay đổi chiều cao của section home
  if (shrinkHeight > maxHeight * 0.5) {
    homeSection.style.height = `${shrinkHeight}px`;
  } else {
    homeSection.style.height = `${maxHeight * 0.5}px`; // Đặt ngưỡng tối thiểu cho chiều cao
  }

  if (window.scrollY > triggerPoint) {
    header.classList.add("fixed");
    header.classList.remove("expanded");
  } else {
    header.classList.remove("fixed");
    header.classList.add("expanded");
  }

  const opacityValue = Math.max(1 - scrollPosition / (maxHeight * 0.38), 0); // Giảm opacity nhanh hơn
  homeContent.style.opacity = opacityValue;
});

//================================================================================================================================
//================================================================================================================================
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

  const timeElement = document.getElementById("time");
  timeElement.textContent = currentTime;
}

setInterval(updateTime, 1000);

// Hàm để cập nhật thời tiết từ Weatherbit
function updateWeather() {
  const apiKey = "8835170ea31a43c3be19900b1d5ed54c";
  const lat = "10.762622";
  const lon = "106.660172";
  const url = `https://api.weatherbit.io/v2.0/current?lat=${lat}&lon=${lon}&key=${apiKey}`;
  // fetch(url)
  //   .then((response) => response.json())
  //   .then((data) => {
  //     const temperature = data.data[0].temp; // Lấy nhiệt độ từ phản hồi
  //     const weatherElement = document.getElementById("weather");
  //     weatherElement.textContent = `Nhiệt độ hiện tại: ${temperature}°C`;
  //   })
  //   .catch((error) => {
  //     console.error("Lỗi khi lấy dữ liệu thời tiết:", error);
  //   });

  const data = [
    {
      app_temp: 35.3,
      aqi: 80,
      city_name: "Quận Mười",
      clouds: 0,
      country_code: "VN",
      datetime: "2024-08-30:01",
      dewpt: 24.9,
      dhi: 96,
      dni: 785,
      elev_angle: 32.42,
      ghi: 510,
      gust: 2.6,
      h_angle: -45,
      lat: 10.7626,
      lon: 106.6602,
      ob_time: "2024-08-30 01:36",
      pod: "d",
      precip: 0,
      pres: 1010,
      rh: 77,
      slp: 1011,
      snow: 0,
      solar_rad: 510,
      sources: ["analysis", "G4668", "radar", "satellite"],
      state_code: "20",
      station: "G4668",
      sunrise: "22:43",
      sunset: "11:04",
      temp: 29.4,
      timezone: "Asia/Ho_Chi_Minh",
      ts: 1724981810,
      uv: 4,
      vis: 16,
      weather: {
        description: "Clear sky",
        code: 800,
        icon: "c01d",
      },
      wind_cdir: "WSW",
      wind_cdir_full: "west-southwest",
      wind_dir: 246,
      wind_spd: 2.6,
    },
  ];
  const temperature = data[0].temp;
  console.log(temperature);
  const weatherElement = document.getElementById("weather");
  weatherElement.textContent = `${temperature}°C`;
}

// Gọi hàm updateWeather khi trang được tải
window.onload = function () {
  updateWeather();
};

// Gọi hàm updateWeather mỗi 10 phút (600000 ms) để cập nhật nhiệt độ
setInterval(updateWeather, 6000000);

// =====================================================================
// Slider
// =====================================================================
let currentSlideIndex = 0;
let autoSlideInterval;

// Hàm hiển thị slide
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

  // Ẩn tất cả các slide
  for (let i = 0; i < slides.length; i++) {
    slides[i].classList.remove("active");
  }

  // Bỏ active class của tất cả các dots
  for (let i = 0; i < dots.length; i++) {
    dots[i].classList.remove("active");
  }

  // Hiển thị slide hiện tại và thêm active class vào dot tương ứng
  slides[slider.currentSlideIndex].classList.add("active");

  dots[slider.currentSlideIndex].classList.add("active");
}

// Tự động chuyển slide
function autoSlide(sliderId) {
  const slider = document.getElementById(sliderId);
  slider.currentSlideIndex = 0;

  // Tự động chuyển slide mỗi 3 giây
  slider.autoSlideInterval = setInterval(function () {
    showSlides(sliderId, slider.currentSlideIndex + 1);
  }, 1500);
}

// Hiển thị slide hiện tại và dừng tự động chuyển khi người dùng tương tác
function currentSlide(sliderId, n) {
  clearInterval(document.getElementById(sliderId).autoSlideInterval); // Dừng tự động chuyển khi người dùng thao tác
  showSlides(sliderId, n - 1);
  autoSlide(sliderId); // Tiếp tục tự động chuyển sau khi người dùng tương tác
}

// Khởi tạo slider cho các project khác nhau
autoSlide("slider-project-1");
