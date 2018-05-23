$(document).ready(function () {

    // Initialize Firebase
    var config = {
        apiKey: "AIzaSyCi7WFZ5jXpXfv-HPXwNMr4taZtHpF5eoo",
        authDomain: "hostelfood-88be6.firebaseapp.com",
        databaseURL: "https://hostelfood-88be6.firebaseio.com",
        projectId: "hostelfood-88be6",
        storageBucket: "hostelfood-88be6.appspot.com",
        messagingSenderId: "1019347251845"
    };
    firebase.initializeApp(config);
    const messaging = firebase.messaging();
    messaging.requestPermission().then(function () {
        console.log('Notification permission granted.');
        return messaging.getToken();
    })
        .then(function (token) {
            console.log(token);
            alert(token);
            var data = {
                'token': token
            }
            $.post('/fcm', data, function (result) {
                console.log(result);
            })
        })
        .catch(function (err) {
            console.log('Unable to get permission to notify.', err);
        });
    messaging.onMessage(function (payload) {
        console.log('Message received. ', payload);
    });
    

    $("#sig").css("display", "none");
    var modal = $("#myModal");
    var span = $(".close");
    span.click(function () {
        modal.css("display", "none");
    })
    $("#lgout").css('display', 'none');
    //showing sign up form
    $('#gts').click(function () {
        $("#sig").css("display", "block");
        $("#log").css("display", "none");
    })

    function lstup() {
        $.get('/lupdate', function (result) {
            console.log(result + 'a');
            var d = result + 'a';
            $("#lstime").html(result);;
        })
    }
    lstup();
    //back to login 
    $('#bk').click(function () {
        $("#log").css("display", "block");
        $("#sig").css("display", "none");
    })

    //promt for login

    if ($.cookie('username')) {
        alert("hello user");
       // grantPer();
        $("#lgout").css('display', 'block');
    } else {
        modal.css("display", "block")
    }





    $("#login").click(function (e) {
        alert("hai");
        e.preventDefault();
        var email = $('#username').val();
        var password = $('#userpass').val();
        // set cookies to expire in 14 days
        $.cookie('username', email, {
            expires: 1
        });
        alert($.cookie('username'));
        $.post('/login', {
            username: email,
            password: password
        }, function (result) {
            console.log(result.sucess);
            if (result.sucess == true) {
                $.cookie('username', email, {
                    expires: 2
                });
                modal.css("display", "none");
               // grantPer();
                $("#lgout").css('display', 'block');
            } else {
                alert("Login Failed");
            }
        })
    })

    //sign up 

    $("#signup").click(function (e) {
        e.preventDefault();
        alert("hai");
        var email = $('#rusername').val();
        var passw = $('#ruserpass').val();
        $.post('/register', {
            username: email,
            password: passw
        }, function (result) {
            if (result.sucess) {
                $.cookie('username', email, {
                    expires: 2
                });
                modal.css("display", "none");
               // grantPer();
                $("#lgout").css('display', 'block');
            } else {
                alert("registered Failed");
            }
        })
    })

    //logout action

    $("#lgout").click(function () {
        $.removeCookie('username');
        $("#lgout").css('display', 'none');
    })

    //Remove Td 

    $("#tbUser").on('click', '.btnDelete', function () {
        $(this).closest('tr').remove();
    });

    //admore
    $("#admore").click(function () {
        var data = '<tr class="item" ><td class="mdl-data-table__cell--non-numeric "><input type="text" class ="curry" name="curry"></td><td class="mdl-data-table__cell--non-numeric"><input type="number" class ="cost" name="cost"></td><td><button class="mdl-button mdl-js-button mdl-button--raised btnDelete">Delete</button></td></tr>';
        $(data).appendTo("tbody");
    })

    //adcurries

    $("#adc").click(function () {
        if ($.cookie('username')) {
            var values = [];
            var send = true;
            $("tr.item").each(function () {
                var cur = $(this).find("input.curry").val(),
                    cst = $(this).find("input.cost").val();
                console.log(cur + '  ' + cst);
                if (cur && cst) {
                    var data = {
                        curry: cur,
                        cost: cst
                    }
                    values.push(data)
                } else {
                    alert("Some  fields are empty");

                }
            })
            if (send == true) {
                var obj = {
                    'v': values,
                }
                // console.log(values);
                $.post('/adcurries', obj, function (result) {
                    console.log(result)
                })
            }
        } else {
            alert("You must login to add Curries")
        }
    })
    // update curries field
    $.get('/listofcurries', function (result) {
        var data = JSON.parse(result);
        for (i = 0; i < data.length; i++) {
            content = '<div class="mdl-textfield mdl-js-textfield mdl-textfield--floating-label"><input class="mdl-textfield__input" type="number" name="' + data[i].curry + '" id="' + data[i].curry + i + '"><label class="mdl-textfield__label" for="' + data[i].curry + i + '">' + data[i].curry + '</label></div>';
            $(content).appendTo("#curriesdiv");
        }
    })
    //take order
    $("#place").click(function (e) {
        e.preventDefault();
        if ($.cookie('username')) {
            var form = $("#frm");
            var obj = ConvertFormToJSON(form);
            console.log(obj);
            $.post("/adorder", obj, function (result) {
                alert(result);
            })
            $(this).closest('form').find("input[type=number]").val("");
        } else {
            alert("Please login to place order")
        }
    })

    function ConvertFormToJSON(form) {
        var array = jQuery(form).serializeArray();
        var json = {};
        json['username'] = $.cookie('username');
        jQuery.each(array, function () {
            if (this.value) {
                json[this.name] = this.value || '';
            }
        });

        return json;
    }

    $("#orderdetails").click(function () {
        $("#addfoot").empty();
        $("#addthead").empty();
        $("#addbody").empty();
        var tdd;
        $.get("/colnames", function (result) {
            //console.log(result);
            tdd = result;
            for (i = 0; i < result.length; i++) {
                var content = '<th class="mdl-data-table__cell--non-numeric">' + result[i] + '</th>';
                $(content).appendTo('#addthead');
            }
        })
        setTimeout(function () {
            $.get("/tabledata", function (result) {
                console.log(JSON.parse(result).length);
                var obj = JSON.parse(result);
                for (i = 0; i < obj.length; i++) {
                    var cnt = "<tr>";
                    Object.keys(obj[i]).forEach(function (key) {
                        cnt += '<td class="mdl-data-table__cell--non-numeric ">' + obj[i][key] + '</td>';
                    })
                    cnt += '</tr>';
                    $(cnt).appendTo("#addbody");
                }
                console.log(tdd);
            })
            setTimeout(function () {
                $.get("/total", function (result) {
                    console.log(result);
                    var content = '<tr><td class="mdl-data-table__cell--non-numeric cost"></td>';
                    for (i = 0; i < result.length; i++) {
                        content += '<td class="mdl-data-table__cell--non-numeric cost">' + result[i] + '</td>';
                    }
                    content += '</td>';
                    $(content).appendTo('#addfoot');

                })
            }, 2000);
        }, 1000);
    })

})