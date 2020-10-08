document.addEventListener("DOMContentLoaded", () => {
  let slider = document.getElementById("time-slider");
  slider.addEventListener("input", (e) => {
    let limit_container = document.getElementById("time-limit");
    let slider_value = e.target.value;
    slider_value = slider_value.padStart(4, "0");
    limit_container.innerText = slider_value;
  });

  let limit_container = document.getElementById("time-limit");
  limit_container.innerText = slider.value;

  let start = document.getElementById("game-start");
  start.addEventListener("click", () => {
    fade_in_game();
    fade_out_menu();
    main(document.getElementById("time-slider").value);
  });

  let restart = document.getElementById("game-restart");
  restart.addEventListener("click", (e) => {
    location.reload();
  });
});

fade_in_game = () => {
  document.getElementById("game").classList.remove("hide");
};
fade_out_menu = () => {
  document.getElementById("main-menu").classList.add("hide");
};

main = (limit) => {
  let board_width = 10;
  let board_height = 10;
  let block_clicked;
  let time_limit = parseInt(limit);
  let start_time = new Date();
  let updater = setInterval(() => {
    update_time();
  }, 1000);

  let hint_area = document.getElementById("hint-area");
  hint_area.addEventListener("mouseenter", () => {
    reveal_all();
  });
  hint_area.addEventListener("mouseleave", () => {
    hide_all();
  });

  create_board = () => {
    let board = document.getElementById("game-board");

    for (let i = 0; i < board_height; i++) {
      let row = document.createElement("div");
      row.classList.add("row");
      for (let j = 0; j < board_width; j++) {
        let block = document.createElement("div");
        block.classList.add("block");

        //block.setAttribute("row", i);
        //block.setAttribute("col", j);

        block.addEventListener("click", (e) => {
          handle_click(e.target);
        });
        row.appendChild(block);
      }
      board.appendChild(row);
    }

    add_icons();
  };

  add_icons = () => {
    let blocks = document.getElementsByClassName("block");
    for (let block of blocks) {
      set_icons(block);
    }
  };
  set_icons = (block) => {
    block.innerText = random_icon();
  };

  random_icon = () => {
    let icon = icons[Math.floor(Math.random() * icons.length)];
    if (icon.used < 2) {
      icon.used++;
      return icon.icon;
    } else return random_icon();
  };

  increase_moves = () => {
    let moves = document.getElementById("score-number");
    moves.innerText = parseInt(moves.innerText) + 1;
  };

  handle_click = (target) => {
    if (document.getElementsByClassName("active").length == 2) {
      return;
    }

    target.classList.add("active");

    if (block_clicked) {
      increase_moves();
      block_clicked = false;
      if (!check_active()) {
        setTimeout(() => {
          reset_active();
        }, 500);
      } else {
        permanent_active();
      }
    } else {
      block_clicked = true;
    }

    if (check_win()) {
      end_game();
    }
  };

  check_active = () => {
    let blocks = document.getElementsByClassName("active");
    if (blocks[0].innerText == blocks[1].innerText) {
      return true;
    } else return false;
  };

  reset_active = () => {
    for (i = 0; i < 2; i++) {
      document.getElementsByClassName("active")[0].classList.remove("active");
    }
  };

  permanent_active = () => {
    for (i = 0; i < 2; i++) {
      let block = document.getElementsByClassName("active")[0];
      block.classList.add("visible");
      block.classList.remove("active");
    }
  };

  check_win = () => {
    if (
      document.getElementsByClassName("visible").length ==
      board_height * board_width
    ) {
      return true;
    } else return false;
  };

  reveal_all = () => {
    let blocks = document.getElementsByClassName("block");
    for (let block of blocks) {
      block.classList.add("hinted");
    }
  };

  hide_all = () => {
    let blocks = document.getElementsByClassName("block");
    for (let block of blocks) {
      if (block.classList.contains("hinted")) block.classList.remove("hinted");
    }
  };

  update_time = () => {
    let time_container = document.getElementById("time-number");
    let current_time = new Date();
    let difference = Math.floor(Math.abs(current_time - start_time) / 1000);
    time_container.innerText = difference;
    if (difference >= time_limit) {
      clearInterval(updater);
      end_game();
    }
  };

  get_time = () => {
    return document.getElementById("time-number").innerText;
  };

  get_pairs = () => {
    return parseInt(document.getElementsByClassName("visible").length / 2);
  };

  get_moves = () => {
    return document.getElementById("score-number").innerText;
  };

  end_game = () => {
    document.getElementById("game").classList.add("fade-out");
    document.getElementById("game-end").classList.remove("hide");
    document.getElementById("end-time-number").innerText = get_time();
    document.getElementById("end-pairs-number").innerText = get_pairs();
    document.getElementById("end-moves-number").innerText = get_moves();
  };

  let icons = [
    { icon: "🚗", used: 0 },
    { icon: "🚕", used: 0 },
    { icon: "🚁", used: 0 },
    { icon: "🛸", used: 0 },
    { icon: "⛅", used: 0 },
    { icon: "🌙", used: 0 },
    { icon: "⛄", used: 0 },
    { icon: "⚡", used: 0 },
    { icon: "🍕", used: 0 },
    { icon: "🍔", used: 0 },
    { icon: "🌭", used: 0 },
    { icon: "🥓", used: 0 },
    { icon: "🍉", used: 0 },
    { icon: "🍏", used: 0 },
    { icon: "🍒", used: 0 },
    { icon: "🍓", used: 0 },
    { icon: "🌽", used: 0 },
    { icon: "🍄", used: 0 },
    { icon: "🎭", used: 0 },
    { icon: "🎃", used: 0 },
    { icon: "🎉", used: 0 },
    { icon: "🎁", used: 0 },
    { icon: "⚽", used: 0 },
    { icon: "🥎", used: 0 },
    { icon: "🏀", used: 0 },
    { icon: "🏐", used: 0 },
    { icon: "⚾", used: 0 },
    { icon: "🏉", used: 0 },
    { icon: "🏈", used: 0 },
    { icon: "🏆", used: 0 },
    { icon: "🐮", used: 0 },
    { icon: "🐷", used: 0 },
    { icon: "🐗", used: 0 },
    { icon: "🐭", used: 0 },
    { icon: "🐹", used: 0 },
    { icon: "🐰", used: 0 },
    { icon: "🐻", used: 0 },
    { icon: "🐨", used: 0 },
    { icon: "🐼", used: 0 },
    { icon: "🦓", used: 0 },
    { icon: "🐴", used: 0 },
    { icon: "🦄", used: 0 },
    { icon: "🐸", used: 0 },
    { icon: "🐔", used: 0 },
    { icon: "🐲", used: 0 },
    { icon: "💩", used: 0 },
    { icon: "👨‍🎓", used: 0 },
    { icon: "🕵️‍♂️", used: 0 },
    { icon: "💂‍♂️", used: 0 },
    { icon: "🎅", used: 0 },
  ];

  create_board();
};
