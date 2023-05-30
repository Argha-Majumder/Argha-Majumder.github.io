const setAlarmHours = document.getElementById('clockhrs');
const setAlarmMinutes=document.getElementById('clockmins');
const setAlarmSeconds=document.getElementById('clocksecs');
const setAlarmAmPm =  document.getElementById('ampm');
const setAlarmDesc =  document.getElementById("alarm-desc");
const setAlarmButton = document.getElementById('set');
const alarmList = document.getElementById('alarm-lists');

const alarms = [];

function addAlarm(time) {
    const alarm = {
        time: formatTime(time),
        desc: setAlarmDesc.value,
        isRinging: false
    };
    alarms.push(alarm);
    renderAlarms();
}

function formatTime(time) {
    const [hours, minutes, seconds, period] = time.split(/:|\s/);
    return `${addZero(hours)}:${addZero(minutes)}:${addZero(seconds)} ${period}`;
}

function addZero(value) {
    return value.toString().padStart(2, '0');
}

function renderAlarms() {
    alarmList.innerHTML = '';
    alarms.forEach((alarm,index)=>{
        const div = document.createElement('div');
        div.classList.add("alarm-details");
        div.innerHTML = `
            <div><i class="fa fa-clock-o" style="font-size:20px;color:red"></i></div>
            <div><span>${alarm.time}</span></div>
            <div>${alarm.desc}</div>
            <div class="icon"><i class="material-icons" style="font-size:20px;color:red">delete</i><div>
        `;
        div.querySelector(".icon").addEventListener('click',()=> removeAlarm(index));
        alarmList.appendChild(div);
    });
    const mainDiv = document.getElementById('main');
    const numAlarms = alarms.length;
    const minHeight = 400; // Minimum height of the main div
    const alarmHeight = 50; // Height of each alarm details div
    const newHeight = minHeight + numAlarms * alarmHeight;
    mainDiv.style.height = newHeight + 'px';
}

function removeAlarm(index) {
    alarms.splice(index,1);
    renderAlarms();
}

function checkAlarms() {
    let currentTime = new Date().toLocaleTimeString();
    if (currentTime[1]==':')
        currentTime = "0"+currentTime;
    document.getElementById("clock").innerHTML = currentTime;
    alarms.forEach(alarm=>{
        if (!alarm.isRinging && alarm.time===currentTime) {
            alarm.isRinging = true;
            ringAlarm();
        }
    });
}

function ringAlarm() {
    alert("Alarm is ringing!");
}

setAlarmButton.addEventListener('click',()=> {
    const alarmTime = `${setAlarmHours.value}:${setAlarmMinutes.value}:${setAlarmSeconds.value} ${setAlarmAmPm.value}`;
    // console.log(alarmTime);
    addAlarm(alarmTime);
    closeButton();
});

setInterval(checkAlarms,1000);
hoursOption();
minOption();
secondOption();

function hoursOption() {
    let select = document.getElementById('clockhrs');
    let hrs = 12;

    for (let i=1;i<=hrs;i++) {
        select.options[select.options.length] = new Option(i<10?"0"+i:i,i);
    }
}

function minOption() {
    let select = document.getElementById('clockmins');
    let min = 60;
    for (let i=0;i<min;i++) {
        select.options[select.options.length] = new Option(i<10?"0"+i:i,i);
    }
}

function secondOption() {
    let select = document.getElementById('clocksecs');
    let second = 60;
    for (let i=0;i<second;i++) {
        select.options[select.options.length] = new Option(i<10?"0"+i:i,i);
    }
}

function openButton() {
    document.getElementById("popupForm").style.display = "flex";
};

function closeButton() {
    document.getElementById("popupForm").style.display = "none";
};