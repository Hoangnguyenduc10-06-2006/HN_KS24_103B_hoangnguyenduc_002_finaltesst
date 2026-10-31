let members = [
  {
    memberCode: "GYM-001",
    fullName: "Hoàng Văn Nam",
    packageName: "Gói Cơ Bản",
    age: 22,
    monthCount: 3,
  },
  {
    memberCode: "GYM-002",
    fullName: "Lý Thị Mai",
    packageName: "Gói Yoga",
    age: 30,
    monthCount: 6,
  },
  {
    memberCode: "GYM-003",
    fullName: "Bùi Đức Anh",
    packageName: "Gói Thể Hình Nâng Cao",
    age: 27,
    monthCount: 12,
  },
];

function printfMenu() {
  const menu = `
  ======================================
HỆ THỐNG QUẢN LY HỘI VIEN PHONG TẬP FITZONE
============================================

1. Hiến thị danh sách hội viên
2. Thêm hội viên mới
3. Cập nhật thông tin hội viên
4. Xóa hội viên
5. Tìm kiếm hội vien theo gói tập
0. Thoát chưong trình

Vui lòng nhập lựa chọn của bạn (0 - 5):`;
  const result = prompt(menu);
  return result !== null ? result.trim() : null;
}

function findMember(code) {
  for (let i = 0; i < members.length; i++) {
    if (members[i].memberCode === code) {
      return i;
    }
  }
  return -1;
}

function validateMemberCode(code) {
  if (!code || code === "") {
    return "Chưa nhập mã hội viên";
  }
  if (code.length < 6) {
    return "Độ dài nhỏ hơn 6 ký tự";
  }
  if (!code.startsWith("GYM-")) {
    return 'Sai tiền tố "GYM-"';
  }
  if (code.includes(" ")) {
    return "Chứa khoảng trắng";
  }
  if (findMember(code) !== -1) {
    return "Mã hội viên đã tồn tại";
  }
  return "";
}

function inputPositiveInteger(message, min, max) {
  while (true) {
    const raw = prompt(message);
    if (raw === null) {
      return null;
    }
    const trimmed = raw.trim();
    const number = Number(trimmed);
    if (
      trimmed !== "" &&
      Number.isInteger(number) &&
      number >= min &&
      number <= max
    ) {
      return number;
    }
    alert(`Vui lòng nhập một số nguyên dương hợp lệ (${min} - ${max}).`);
  }
}

function calculateTotal(ticketCount, pricePerTicket) {
  const baseCost = ticketCount * pricePerTicket;
  const discount = ticketCount >= 4 ? Math.round(baseCost * 0.1) : 0;
  const serviceFee = Math.round((baseCost - discount) * 0.08);
  const totalAmount = baseCost - discount + serviceFee;
  return {
    baseCost: baseCost,
    discount: discount,
    serviceFee: serviceFee,
    totalAmount: totalAmount,
  };
}

function formatTitleCase(str) {
  return str
    .toLowerCase()
    .split(/\s+/)
    .filter((word) => {
      return word.length > 0;
    })
    .map((word) => {
      return word.charAt(0).toUpperCase() + word.slice(1);
    })
    .join(" ");
}

function normalize(rawText) {
  while (true) {
    const raw = prompt(rawText);
    if (raw === null) {
      return null;
    }
    const trimmed = raw.trim();
    if (trimmed !== "") {
      return formatTitleCase(trimmed);
    }
    alert("Dữ liệu không được để trống. Vui lòng nhập lại!");
  }
}

function displayMembers(list) {
  if (!list || list.length === 0) {
    console.log("Danh sách hội viên trống");
    return;
  }

  let totalRevenue = 0;
  for (let i = 0; i < list.length; i++) {
    const item = list[i];
    console.log(
      `${i + 1}. ${item.memberCode} - ${item.fullName} - ${item.packageName}\n   Tuổi: ${item.age} | Số tháng đăng ký: ${item.monthCount} `,
    );
    totalRevenue += item.totalAmount;
  }
  console.log(`Tổng: ${list.length} hội viên`);
}

function handleDisplay() {
  console.log("\n--- DANH SÁCH HỘI VIÊN HIỆN TẠI ---");
  displayMembers(members);
}

function handleAdd() {
  const rawCode = prompt("Nhập mã đơn đặt vé (ví dụ: GYM-):");
  if (rawCode === null) {
    console.log("Hủy thao tác thêm");
    return;
  }

  const normalizedCode = rawCode.trim().toUpperCase();
  const errorMsg = validateMemberCode(normalizedCode);
  if (errorMsg !== "") {
    console.log(`Lỗi: ${errorMsg}`);
    return;
  }

  const customerName = normalize("Nhập tên hội viên:");
  if (customerName === null) {
    console.log("Hủy thao tác thêm");
    return;
  }

  const packageName = normalize("Gói tập: ");
  if (packageName === null) {
    console.log("Hủy thao tác thêm");
    return;
  }

  const age = inputPositiveInteger("Nhập số tuổi (16-70):", 16, 70);
  if (age === null) {
    console.log("Hủy thao tác thêm");
    return;
  }

  const month = inputPositiveInteger("Nhập số tháng đăng ký (1-24):", 1, 24);
  if (month === null) {
    console.log("Hủy thao tác thêm");
    return;
  }
  const newbie = {
    memberCode: normalizedCode,
    fullName: customerName,
    packageName: packageName,
    age: age,
    monthCount: month,
  };

  members.push(newbie);

  console.log("\n========================================");
  console.log("       thông tin hội viên mới         ");
  console.log("========================================");
  console.log(`Mã hội viên    : ${newbie.memberCode}`);
  console.log(`Tên khách hàng: ${newbie.fullName}`);
  console.log(`Tên gói tập     : ${newbie.packageName}`);
  console.log(`tuổi   : ${newbie.age}`);
  console.log(`tháng  : ${newbie.monthCount}`);
}

function handleUpdateBooking() {
  const rawCode = prompt("Nhập mã hội viên cần cập nhật:");
  if (rawCode === null) {
    console.log("Đã hủy cập nhật");
    return;
  }

  const normalizedCode = rawCode.trim().toUpperCase();
  const index = findMember(normalizedCode);
  if (index === -1) {
    console.log(`Không tìm thấy hội viên có mã ${normalizedCode}`);
    return;
  }

  const currentMember = members[index];
  const oldAge = currentMember.age;

  const newAge = inputPositiveInteger(
    `Nhập số tuổi mới cho  ${normalizedCode} (Hiện tại: ${currentMember.age}):`,
    16,
    70,
  );
  if (newAge === null) {
    console.log("Đã hủy cập nhật");
    return;
  }

  const newMonth = inputPositiveInteger(
    `Nhập giá vé mới cho đơn ${normalizedCode} (Hiện tại: ${currentMember.monthCount}):`,
    1,
    24,
  );
  if (newMonth === null) {
    console.log("Đã hủy cập nhật");
    return;
  }

  currentMember.age = newAge;
  currentMember.monthCount = newMonth;

  console.log(`Cập nhật thành công ${normalizedCode}!`);
}

function handleDelete() {
  const rawCode = prompt("Nhập mã hội viên cần xóa:");
  if (rawCode === null) {
    console.log("Đã hủy thao tác xóa");
    return;
  }

  const normalizedCode = rawCode.trim().toUpperCase();
  const index = findMember(normalizedCode);
  if (index === -1) {
    console.log(`Không tìm thấyhội viên có mã ${normalizedCode}`);
    return;
  }

  const confirmChoice = prompt(
    `Bạn có chắc chắn muốn xóa  ${normalizedCode}? (Nhập 'Y' để xác nhận):`,
  );
  if (confirmChoice !== null && confirmChoice.trim().toUpperCase() === "Y") {
    members.splice(index, 1);
    console.log(`Xóa thành công, còn ${members.length} hội viên`);
  } else {
    console.log(`Đã hủy thao tác xóa, còn ${members.length} hội viên`);
  }
}

function handleSearch() {
  const keyword = prompt("Nhập tên gói tìm kiếm:");
  if (keyword === null || keyword.trim() === "") {
    console.log("Chưa nhập từ khóa tìm kiếm");
    return;
  }

  const searchKey = keyword.trim().toLowerCase();
  const matchedList = members.filter((item) => {
    return item.packageName.toLowerCase().includes(searchKey);
  });

  if (matchedList.length === 0) {
    console.log("Không tìm thấy gói tập phù hợp");
    return;
  }

  console.log(`\nTìm thấy ${matchedList.length} gói phù hợp:`);
  displayMembers(matchedList);
}

let running = true;

do {
  const userChoice = printfMenu();

  switch (userChoice) {
    case "1": {
      handleDisplay();
      break;
    }
    case "2": {
      handleAdd();
      break;
    }
    case "3": {
      handleUpdateBooking();
      break;
    }
    case "4": {
      handleDelete();
      break;
    }
    case "5": {
      handleSearch();
      break;
    }
    case "0": {
      console.log(
        "Cảm ơn bạn đã sử dụng chương trình Moonlight Cinema. Hẹn gặp lại!",
      );
      running = false;
      break;
    }
    default: {
      console.log("Lựa chọn không hợp lệ. Vui lòng chọn một số từ 0 đến 5.");
      break;
    }
  }
} while (running);
