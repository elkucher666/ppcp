document.addEventListener("DOMContentLoaded", onLoad);

async function onLoad() {

    let response = await fetch('./../queries/get_room.php', {
        method: 'POST'
    });
    let result = await response.text();
    let rooms = JSON.parse(result);

    let addresses = [];
    for (let room of rooms) {
        if (!addresses.includes(room.address)) {
            addresses.push(room.address);
        }
    }
    for (let address of addresses) {
        let button = document.createElement("button");
        button.textContent = address;
        button.classList.add("tab");
        document.querySelector(".addressses").append(button);


        button.addEventListener("click", function() {
            document.querySelectorAll(".tab").forEach(function (elem) {
                elem.classList.remove("selected");
            });
            button.classList.add("selected");


            room_elements.forEach(function(room) {
                room.remove();
            });
            
            let visible_rooms = room_elements.filter((room) => room.dataset.address == address);
            visible_rooms.forEach(function(room) {
                document.querySelector(".tabcontent").append(room);
            });
            
        });
    }


    let time_buttons = document.querySelectorAll(".buttime");

    for (let time_button of time_buttons) {
        time_button.addEventListener("click", function() {
            document.querySelectorAll(".buttime").forEach(function (elem) {
                elem.classList.remove("selected");
            });
            time_button.classList.add("selected");
            
        });
    }


    document.querySelector("#apply_filter").addEventListener("click", async function() {
        let phone = document.querySelector("input[name='phone']");
        let fullname = document.querySelector("input[name='fullname']");


        if (phone.reportValidity() && fullname.reportValidity()) {
            let booking_date = document.querySelector("input[name='booking_date']");
            let application_date = document.querySelector("input[name='application_date']");
            let approved = document.querySelector("select[name='approved']");
            let address = document.querySelector("select[name='address']");

            let formData = new FormData();

            formData.append("phone", phone.value);
            formData.append("fullname", fullname.value);
            formData.append("booking_date", booking_date.value);
            formData.append("application_date", application_date.value);
            formData.append("approved", approved.value);
            formData.append("address", address.value);

            let response = await fetch('./../queries/get_filtered_application.php', {
                method: 'POST',
                body: formData
            });

            let result = await response.text();
            console.log(result);
            //let rooms = JSON.parse(result);

        }


    });
    
}
