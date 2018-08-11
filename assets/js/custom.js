$('#btn_register_whitepaper').click(function (e) {
    e.preventDefault();
    registerWhitepaperEnglish();
});

$('#btn_register_whitepaper_zhongwen').click(function (e) {
    e.preventDefault();
    registerWhitepaperZhongWen();
});

$('#btn_enroll_whitelist').click(function (e) {
    e.preventDefault();
    enrollWhitelist();
});


function enrollWhitelist() {
    var label = '#form-whitelist';

    var language = $("input[type='radio'][name='whitelist-language']:checked").val();
    var currency = $("input[type='radio'][name='whitelist-currency']:checked").val();
    var name = $("#whitelist-name").val();
    var email = $("#whitelist-email").val();
    var wallet = $("#whitelist-wallet").val();

    if (name === '' || validateSpecialChars(name)) {
        showError("Please provide a full name", label);
        return false;
    }
    if (email === '' || !validateEmail(email)) {
        showError("Email address is invalid", label);
        return false;
    }
    if ((language == null) || (language === '')) {
        showError("Please specify your language?", label);
        return false;
    }
    if ((currency == null) || (currency === '')) {
        showError("Please specify your crypto?", label);
        return false;
    }
    if (currency == 'ETH') {
        if (!validateEthAddress(wallet)) {
            showError("Please provide valid " + currency + " address", label);
            return false;
        }
    } else {
        if (currency == 'BTC') {
            if (!validateBtcAddress(wallet)) {
                showError("Please provide valid " + currency + " address", label);
                return false;
            }
        } else {
            //do nothing, let pass
            if ((wallet == null) || (wallet === '')) {
                showError("Please provide valid " + currency + " address", label);
                return false;
            }
        }
    }

    hideError(label);

    $('#btn_enroll_whitelist').hide();
    $('#btn_enroll_close').hide();

    $.ajax({
        type: "POST",
        url: 'https://r5jjfdh1ub.execute-api.ap-southeast-1.amazonaws.com/processWhitelist',
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        data: JSON.stringify({
            name: name,
            email: email,
            wallet: wallet,
            currency: currency,
            language: language
        }),
        success: function (res) {
            $('#div_register_whitelist').hide();

            $('#form-whitelist').removeClass("text-danger").addClass("text-success").html('Thank you for enrolling in the whitelist. You can download the latest whitepaper from our site. We will inform you of token sale dates by email. You are also encouraged to join our Telegram group at <a href=\'https://t.me/smartpesa\' target=\'_blank\'>https://t.me/smartpesa</a><p>&nbsp;.');
        },
        error: function (xhr, textStatus, error) {
            $('#btn_enroll_whitelist').show();
            $('#btn_enroll_close').show();
            showError('Error in submission', label);
        }
    });
}

function registerWhitepaperEnglish() {
    var label = '#form-whitepaper';

    var receive_mkt_com = $("input[type='radio'][name='receive_mkt_com']:checked").val();
    var name = $("#name").val();
    var email = $("#email").val();
    var citizenship = 'EN';

    if (name === '' || validateSpecialChars(name)) {
        showError("Please provide a full name", label);
        return false;
    }
    if (email === '' || !validateEmail(email)) {
        showError("Email address is invalid", label);
        return false;
    }
    if ((receive_mkt_com == null) || (receive_mkt_com === '')) {
        showError("Subscribe to newsletter?", label);
        return false;
    }

    hideError(label);

    $('#btn_register_whitepaper').hide();

    $.ajax({
        type: "POST",
        url: 'https://d5nuvt5gy7.execute-api.ap-southeast-1.amazonaws.com/registerWhitepaper_v1',
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        data: JSON.stringify({
            name: name,
            email: email,
            citizenship: citizenship,
            receive_mkt_com: receive_mkt_com
        }),
        success: function (res) {
            $('#div_register_whitepaper').hide();

            $('#form-whitepaper').removeClass("text-danger").addClass("text-success").html('Thank you for registering for the white paper. You can download the latest version using the link below and you will be informed by email on new versions from time to time.  You are also encouraged to join our Telegram group at <a href=\'https://t.me/smartpesa\' target=\'_blank\'>https://t.me/smartpesa</a><p>&nbsp;.');

            var url = 'https://files.smartpesa.io/public/Smartpesa+Credible+Whitepaper+English+(Latest).pdf';
            $('#form-executive').text('Download Whitepaper');
            $('#form-executive').attr("href", url);
        },
        error: function (xhr, textStatus, error) {
            $('#btn_register_whitepaper').show();
            showError('Error in submission', label);
        }
    });
}

function registerWhitepaperZhongWen() {
    var label = '#form-whitepaper_zhongwen';

    var receive_mkt_com = $("input[type='radio'][name='receive_mkt_com']:checked").val();
    var name = $("#name_zh").val();
    var email = $("#email_zh").val();

    var citizenship = 'ZH';

    if (name === '' || validateSpecialChars(name)) {
        showError("Please provide a full name", label);
        return false;
    }
    if (email === '' || !validateEmail(email)) {
        showError("Email address is invalid", label);
        return false;
    }
    if ((receive_mkt_com == null) || (receive_mkt_com === '')) {
        showError("Subscribe to newsletter?", label);
        return false;
    }

    hideError(label);

    $('#btn_register_whitepaper_zhongwen').hide();

    $.ajax({
        type: "POST",
        url: 'https://d5nuvt5gy7.execute-api.ap-southeast-1.amazonaws.com/registerWhitepaper_v1',
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        data: JSON.stringify({
            name: name,
            email: email,
            citizenship: citizenship,
            receive_mkt_com: receive_mkt_com
        }),
        success: function (res) {
            $('#div_register_whitepaper_zhongwen').hide();
            $('#form-whitepaper_zhongwen').removeClass("text-danger").addClass("text-success").text('感谢您提交. 我们的白皮书草稿已准备好下载. 新版本将不时发布. 如有兴趣参与私人销售，请联系我们.');

            var url = 'https://files.smartpesa.io/public/Smartpesa+Credible+Whitepaper+Mandarin+(Latest).pdf';
            $('#form-executive_zhongwen').text('下载白皮书');
            $('#form-executive_zhongwen').attr("href", url);
        },
        error: function (xhr, textStatus, error) {
            $('#btn_register_whitepaper_zhongwen').show();
            showError('Error in submission', label);
        }
    });
}


$('#contact-submit').click(function (e) {
    e.preventDefault();
    submitContact();
});

function submitContact() {
    var label = '#form-response';

    var name = $("#contact-name").val(),
        email = $("#contact-email").val(),
        message = $("#contact-message").val();

    if (email === '' || !validateEmail(email)) {
        showError("Email address is invalid", label);
        return false;
    }

    $.ajax({
        type: "POST",
        url: 'https://674bdzdbd3.execute-api.ap-southeast-1.amazonaws.com/processContactUs_v1',
        contentType: 'application/json',
        data: JSON.stringify({
            'name': name,
            'email': email,
            'message': message
        }),
        success: function (res) {
            $(label).removeClass("text-danger").addClass("text-success").text('Email was sent successfully.');
        },
        error: function () {
            showError('Error in submission', label);
        }
    });
}


$('#subscribe-button').click(function (e) {
    e.preventDefault();
    subscribeNewsletter();
});

function subscribeNewsletter() {
    var label = '#subscribe-results';

    var email = $("#newsletter-email").val(),
        terms = $("#newsletter-terms")[0].checked;

    if (email === '' || !validateEmail(email)) {
        showError("Email address is invalid", label);
        return false;
    }

    $.ajax({
        type: "POST",
        url: 'https://40k90aicia.execute-api.ap-southeast-1.amazonaws.com/processNewsletter_v1',
        contentType: 'application/json',
        data: JSON.stringify({
            'email': email,
            'terms': terms
        }),
        success: function (res) {
            $('#subscribe-form').hide();
            $(label).removeClass("text-danger").text('Successfully registered to newsletter.');
        },
        error: function () {
            showError("Error in registration", label);
        }
    });
}

function hideError(label) {
    $(label).text('');
}

function showError(error, label) {
    $(label).removeClass("text-success").addClass("text-danger").text(error);
}

function validateEmail(email) {
    var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
}

function validateSpecialChars(value) {
    var re = /[-!$%^&*()_+|~=`{}\[\]:";'<>?,.\/]/;
    return re.test(value);
}

function validateEthAddress(value) {
    var re = /^(0x)?[0-9a-fA-F]{40}$/;
    return re.test(value);
}

function validateBtcAddress(value) {
    var re = /^[13][a-km-zA-HJ-NP-Z1-9]{25,34}$/;
    return re.test(value);
}
