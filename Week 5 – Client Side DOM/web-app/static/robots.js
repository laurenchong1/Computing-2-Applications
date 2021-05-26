const Robots = Object.create(null);

const agreeOptions = [
    "Yes!",
    "Oh goodness!",
    "Looking Good!",
    "Awesome dude."
];

Robots.agreeBot = {
    "name": "Agree Bot",
    "response": function () {
        return agreeOptions[Math.floor(Math.random() * agreeOptions.length)];
    }
};

Robots.reverseBot = {
    "name": "Reverse Bot",
    "response": function (message) {
        return message.split("").reverse().join("");
    }
};

export default Object.freeze(Robots);