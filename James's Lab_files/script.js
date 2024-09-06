// File: script.js

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

// Gọi hàm updateTime mỗi giây để cập nhật thời gian
setInterval(updateTime, 1000);

// Hàm để cập nhật thời tiết từ Weatherbit
function updateWeather() {
  const apiKey = "8835170ea31a43c3be19900b1d5ed54c"; // Thay YOUR_API_KEY bằng API key của bạn từ Weatherbit
  const lat = "10.762622"; // Vĩ độ của Hồ Chí Minh City
  const lon = "106.660172"; // Kinh độ của Hồ Chí Minh City
  const url = `https://api.weatherbit.io/v2.0/current?lat=${lat}&lon=${lon}&key=${apiKey}`;
  console.log(url);
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
  const temperature = data[0].temp; // Lấy nhiệt độ từ phản hồi
  console.log(temperature);
  const weatherElement = document.getElementById("weather");
  weatherElement.textContent = `${temperature}°C`;
  weatherElement.style.color = "#333";
}

// Gọi hàm updateWeather khi trang được tải
window.onload = function () {
  updateWeather();
};

// Gọi hàm updateWeather mỗi 10 phút (600000 ms) để cập nhật nhiệt độ
setInterval(updateWeather, 6000000);

// Process funcition (section2-skills)
function initProgressCircle(elementId, progressPercent) {
  let circle = document.querySelector(`#${elementId} circle`);
  let number = document.querySelector(`#${elementId} .number`);
  let counter = 0;
  let increment = true;
  let hasExceeded = false;
  let maxProgress = 100;

  function updateProgress() {
    // Điều chỉnh tốc độ thay đổi dựa trên vị trí hiện tại
    let speedFactor = increment
      ? (maxProgress - counter) / 10
      : (counter - progressPercent) / 10;
    speedFactor = Math.max(speedFactor, 0.5); // Đảm bảo tốc độ không quá nhỏ

    if (increment) {
      counter += speedFactor;
    } else {
      counter -= speedFactor;
    }

    number.innerHTML = `${Math.round(counter)}%`;

    let offset = 440 - 440 * (counter / 100);
    circle.style.strokeDashoffset = offset;

    if (increment && counter >= maxProgress) {
      increment = false; // Đổi chiều khi đạt đến giá trị vượt quá
      hasExceeded = true; // Đánh dấu là đã vượt quá
    } else if (!increment && counter <= progressPercent) {
      if (hasExceeded) {
        return; // Dừng khi đã quay lại và dừng ở giá trị mục tiêu
      }
    }

    // Gọi lại hàm để tạo loop
    requestAnimationFrame(updateProgress);
  }

  // Bắt đầu quá trình
  updateProgress();
}

// Khởi tạo tiến trình cho các kỹ năng
initProgressCircle("html-css-process", 65, 75); // 65% mục tiêu với 75% vượt quá cho HTML/CSS
