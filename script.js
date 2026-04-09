document.addEventListener("DOMContentLoaded", () => {
  const loginScreen = document.getElementById("loginScreen");
  const protectedContent = document.getElementById("protectedContent");
  const loginBtn = document.getElementById("loginBtn");
  const loginError = document.getElementById("loginError");
  const usernameInput = document.getElementById("username");
  const passwordInput = document.getElementById("password");

  const validUsers = [
    { username: "jean", password: "flowers123" },
    { username: "rose", password: "oursday" }
  ];

  function startFlowerAnimation() {
    const elements = document.querySelectorAll(`
      #Footer_group_1_,
      [id^="PinkFlowerGroup"],
      [id^="BaseGroup"] path,
      [id^="LeafGroup"] path,
      path[id^="Stroke"],
      g[id^="BudGroup"] g[id^="BudGroup"] g[id^="Bud"],
      #Bud8_1_,
      #Bud10_1_,
      #Bud23_1_,
      #Bud26_1_,
      [id^="Dots"],
      [id^="Flourish"]
    `);

    gsap.set(elements, { visibility: "visible" });

    function prepareStroke(el) {
      const length = el.getTotalLength?.();
      if (length) {
        el.style.strokeDasharray = length;
        el.style.strokeDashoffset = length;
      }
    }

    document.querySelectorAll("path").forEach(prepareStroke);

    const tl = gsap.timeline({
      defaults: { ease: "power2.out" }
    });

    tl.to("path", {
      strokeDashoffset: 0,
      duration: 2,
      stagger: 0.01
    });

    tl.fromTo(
      `[id^="LeafGroup"], [id^="PinkFlowerGroup"], [id^="BaseGroup"]`,
      { opacity: 0 },
      { opacity: 1, duration: 1, stagger: 0.1 },
      "-=1"
    );

    tl.fromTo(
      `[id^="Dots"], [id^="Flourish"]`,
      { opacity: 0 },
      { opacity: 1, duration: 1, stagger: 0.05 },
      "-=0.5"
    );

    tl.fromTo(
      "svg#flower-frame",
      { scale: 0.95 },
      { scale: 1, duration: 1 },
      0
    );

    tl.to(".message", {
      opacity: 1,
      y: 0,
      duration: 1
    });

    tl.call(() => {
      document.querySelector(".message")?.classList.add("show");
    });
  }

  function handleLogin() {
    const enteredUsername = usernameInput.value.trim();
    const enteredPassword = passwordInput.value.trim();

    const match = validUsers.some(user =>
      user.username === enteredUsername && user.password === enteredPassword
    );

    if (match) {
      loginError.textContent = "";
      loginScreen.style.display = "none";
      protectedContent.style.display = "block";
      startFlowerAnimation();
    } else {
      loginError.textContent = "Invalid username or password.";
    }
  }

  loginBtn.addEventListener("click", handleLogin);

  passwordInput.addEventListener("keydown", (e) => {
    if (e.key === "Enter") {
      handleLogin();
    }
  });
});