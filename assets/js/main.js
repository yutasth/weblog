(function () {
  "use strict";

  var data = document.getElementById("search-data");
  var posts = [];

  try {
    posts = JSON.parse(data.textContent);
  } catch (error) {
    return;
  }

  var escapeHtml = function (value) {
    var span = document.createElement("span");
    span.textContent = value;
    return span.innerHTML;
  };

  var input = document.getElementById("site-search");
  var results = document.getElementById("search-results");
  var clear = document.querySelector(".search-clear");

  var renderSearch = function () {
    var query = input.value.trim().toLocaleLowerCase("ja");
    clear.classList.toggle("is-visible", query.length > 0);
    results.innerHTML = "";
    results.classList.toggle("is-visible", query.length > 0);

    if (!query) return;

    var matches = posts.filter(function (post) {
      return (post.title + " " + post.text).toLocaleLowerCase("ja").includes(query);
    }).slice(0, 8);

    if (!matches.length) {
      results.innerHTML = '<p class="no-results">見つかりませんでした</p>';
      return;
    }

    matches.forEach(function (post) {
      var link = document.createElement("a");
      link.href = post.url;
      link.innerHTML = "<span>" + escapeHtml(post.title) + "</span>";
      results.appendChild(link);
    });
  };

  input.addEventListener("input", renderSearch);
  clear.addEventListener("click", function () {
    input.value = "";
    renderSearch();
    input.focus();
  });

  var calendarTitle = document.getElementById("calendar-title");
  var calendarBody = document.getElementById("calendar-body");
  var previous = document.getElementById("calendar-prev");
  var next = document.getElementById("calendar-next");
  var postDates = {};

  posts.forEach(function (post) {
    if (!postDates[post.isoDate]) postDates[post.isoDate] = post.url;
  });

  var newest = posts.length ? posts[0].isoDate.split("-").map(Number) : null;
  var current = newest
    ? new Date(newest[0], newest[1] - 1, 1)
    : new Date(new Date().getFullYear(), new Date().getMonth(), 1);

  var renderCalendar = function () {
    var year = current.getFullYear();
    var month = current.getMonth();
    var firstDay = (new Date(year, month, 1).getDay() + 6) % 7;
    var days = new Date(year, month + 1, 0).getDate();
    var cells = [];
    var monthKey = String(year) + String(month + 1).padStart(2, "0");
    var hasPostsInMonth = posts.some(function (post) {
      return post.isoDate.slice(0, 7).replace("-", "") === monthKey;
    });

    calendarTitle.textContent = year + "年 " + (month + 1) + "月";
    if (hasPostsInMonth) {
      calendarTitle.href = calendarTitle.dataset.baseurl + "/" + monthKey + "/";
      calendarTitle.removeAttribute("aria-disabled");
    } else {
      calendarTitle.removeAttribute("href");
      calendarTitle.setAttribute("aria-disabled", "true");
    }
    calendarBody.innerHTML = "";

    for (var blank = 0; blank < firstDay; blank += 1) cells.push("");
    for (var day = 1; day <= days; day += 1) cells.push(day);
    while (cells.length % 7) cells.push("");

    for (var index = 0; index < cells.length; index += 7) {
      var row = document.createElement("tr");

      cells.slice(index, index + 7).forEach(function (dayNumber) {
        var cell = document.createElement("td");

        if (dayNumber) {
          var key = year + "-" + String(month + 1).padStart(2, "0") + "-" + String(dayNumber).padStart(2, "0");
          if (postDates[key]) {
            var link = document.createElement("a");
            link.href = postDates[key];
            link.textContent = dayNumber;
            link.setAttribute("aria-label", key + "の記事");
            cell.appendChild(link);
          } else {
            cell.textContent = dayNumber;
          }
        }

        row.appendChild(cell);
      });

      calendarBody.appendChild(row);
    }
  };

  previous.addEventListener("click", function () {
    current = new Date(current.getFullYear(), current.getMonth() - 1, 1);
    renderCalendar();
  });

  next.addEventListener("click", function () {
    current = new Date(current.getFullYear(), current.getMonth() + 1, 1);
    renderCalendar();
  });

  renderCalendar();
})();
