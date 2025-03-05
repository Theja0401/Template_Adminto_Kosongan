const status_filter = {
    value1: null,
    value2: null,
    value3: null
}

const changeFirstValue = (value) => {
    status_filter.value1 = value;
}

const changeSecondValue = (className, id = "") => {
    if(id){
        $(`.${className}`).removeClass('active');
        $(`#${id}`).addClass('active');
    }

    const elements = document.querySelectorAll(`.${className}`);
    const indexActiveElement = [...elements].findIndex(el => el.classList.contains('active'));
    const value  = elements[indexActiveElement].value;

    status_filter.value2 = value;
}

const changeThirdValue = (className, id = "") => {
    if(id){
        $(`.${className}`).removeClass('active');
        $(`#${id}`).addClass('active');
    }

    const elements = document.querySelectorAll(`.${className}`);
    const indexActiveElement = [...elements].findIndex(el => el.classList.contains('active'));
    const value  = elements[indexActiveElement].value;

    status_filter.value3 = value;
}

const isEmpty = (value) => {
    return (value == null || value == "") ? true : false;
}

const filterInfo = (statusValue) => {
    let valueCount = 0;
    let statusObject = {};

    for(key in statusValue){
        if(statusValue.hasOwnProperty(key)){
            ++valueCount;
        }
    }

    Object.values(status_filter).forEach((el, index) => {
        if(index < valueCount){
            if(isEmpty(el)){
                if(index == 0){
                    changeFirstValue(statusValue.value1);
                }else if(index == 1){
                    changeSecondValue(statusValue.value2);
                }else{
                    changeThirdValue(statusValue.value3);
                }
            }
        }
    })

    const statusDataArray = Object.values(status_filter).filter(el => el != null);

    statusDataArray.forEach((el, index) => {
        statusObject[`data${(index+1)}`] = el;
    })

    return statusObject;
}

const showWarning = (namaData, url, action) => {
    Swal.fire(
        'Perhatian',
        `Belum ada data ${namaData}, silahkan dilengkapi dulu data utamanya`,
        'warning'
    ).then(res => {
        if(action === "redirect"){
            location.href = url;
        }
    })
}

const insertData = (idForm, url, idTable) => {
    const dataForm = new FormData($(`#${idForm}`)[0]);
    let isSuccess = false;
    
    $.ajax({
        type: 'POST',
        url: url,
        data: dataForm,
        contentType: false,
        async: false,
        cache: false,
        processData: false,
    })
    .done((response) => {
        $('#form_result').html('');
        
        if(response.errors){
            response.errors.forEach(el => {
                $('#form_result').append(`<div class="alert alert-danger">${el}</div>`);
            })
        }else if(response.success){
            
            $(`#${idTable}`).DataTable().ajax.reload();
            $('#form_result').html(`<div class="alert alert-success">${response.success}</div>`);
            isSuccess = true;
        }else if(response.warning){
            
            $('#form_result').append(`<div class="alert alert-warning">${response.warning}</div>`);
            
        }else{
            console.log(response.message)
        }
    })
    .fail((err) => {
        if(err.responseJSON.error){
            $('#form_result').append(`<div class="alert alert-danger">${err.responseJSON.error}</div>`);
        }else{
            console.log(err.responseJSON.message);
        }
    })

    closeModal();
    
    return isSuccess;
}

$(document).on( 'click', '.btnEdit' ,() => {
    $('#action_text').text('Edit');
})

const editData = (idForm, url, idTable) => {
    const dataForm = new FormData($(`#${idForm}`)[0]);
    let isSuccess = false;
    
    $.ajax({
        type: 'POST',
        url: url,
        data: dataForm,
        contentType: false,
        cache: false,
        processData: false,
        beforeSend: () => {
            Swal.fire({
                title: "Loading...",
                text: "Harap Menunggu",
                imageUrl: "/assets/img/preloader.gif",
                showConfirmButton: false,
                allowOutsideClick: false,
            });
        }
    })
    .done((response) => {
        $('#form_result').html('');
        $('#btnAction').text('Ubah');
        $('#btnAction').attr('disabled', false);
        
        if(response.errors){
            Swal.fire('Gagal', `Data ini gagal di Update`, 'failed');
            response.errors.forEach(el => {
                $('#form_result').append(`<div class="alert alert-danger">${el}</div>`);
            })
        }else if(response.success){
            
            $(`#${idTable}`).DataTable().ajax.reload();
            Swal.fire('Berhasil', `${response.success}`, 'success');
            isSuccess = true;
            closeModal();
            
        }else if(response.warning){
            
            $('#form_result').append(`<div class="alert alert-warning">${response.warning}</div>`);
            
        }else{
            console.log(response.message)
            Swal.fire('Error', 'Data Gagal diubah', 'error');
        }
    })
    .fail((err) => {
        $('#btnAction').text('Ubah');
        $('#btnAction').attr('disabled', false);
        
        if(err.responseJSON.error){
            Swal.fire('Error', `${err.responseJSON.error}`, 'error');
        }else{
            Swal.fire('Error', 'Data Gagal diubah', 'error');
        }
        
    })
    
    return isSuccess;
}

const changeStatus = (url, idTable) => {
    $.ajax({
        type: 'GET',
        url: url,
        beforeSend: () => {
            Swal.fire({
                title: "Loading...",
                text: "Harap Menunggu",
                imageUrl: '/assets/img/preloader.gif',
                showConfirmButton: false,
                allowOutsideClick: false,
            });
        }
    })
    .done((response) => {
        $(`${idTable}`).DataTable().ajax.reload();
        Swal.fire('Berhasil', `${response.success}`, 'success');
    })
    .fail((err) => {
        Swal.fire('Gagal', `Ada Kesalahan, silahkan di cek`, 'failed');
        if(err.responseJSON.error){
            Swal.fire('Error', `${err.responseJSON.error}`, 'error');
        }else{
            console.log('ada suatu kesalahan di server');
        }
        
    })
}

const download = (url) => {
    console.log(url)
    $.ajax({
        type: 'GET',
        url: url,
        beforeSend: () => {
            Swal.fire({
                title: "Loading...",
                text: "Harap Menunggu",
                imageUrl: "{{ asset('asset/img/preloader.gif') }}",
                showConfirmButton: false,
                allowOutsideClick: false,
            });
        }
    })
    .done((response) => {
        console.log(response)
        Swal.fire('Berhasil', `${response.success}`, 'success');
    })
    .fail((err) => {
        Swal.fire('Gagal', `Ada Kesalahan, silahkan di cek`, 'failed');
        if(err.responseJSON.error){
            Swal.fire('Error', `${err.responseJSON.error}`, 'error');
        }else{
            console.log('ada suatu kesalahan di server');
        }
        
    })
}

//function yang digunakan untuk delete data secara general
const deleteData = (url, idTable) => {
    Swal.fire({
        title:'Apakah Anda Ingin Menghapus?',
        type: 'question',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yakin',
        cancelButtonText: 'Batal',
    }).then((res) => {
        if(res.value){
            $.ajax({
                type: 'POST',
                url: url,
                cache: false,
                contentType: false,
                processData: false,
                beforeSend: () => {
                    Swal.fire({
                        title: "Loading...",
                        text: "Harap Menunggu",
                        imageUrl: "{{ asset('assets/img/preloader.gif') }}",
                        showConfirmButton: false,
                        allowOutsideClick: false,
                    });
                }
            }).done(res => {
                if(res.warning){
                    Swal.fire('Peringatan', res.warning, 'warning');
                }
                
                if(res.success){
                    Swal.fire("Berhasil", res.success, 'success');
                    $(idTable).DataTable().ajax.reload();
                }
            }).catch(err => {
                if(err.responseJSON.error){
                    Swal.fire('Gagal', err.responseJSON.error, 'error');
                }else{
                    console.log(err.responseJSON.message)
                }
            })
        }
    });
}

const tolakData = (url,idTable,title,alasan)=>{
    Swal.fire({
        title:title,
        type: 'question',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yakin',
        cancelButtonText: 'Batal',
    }).then((res) => {
        if(res.value){
            $.ajax({
                type: 'post',
                url: url,
                async:true,
                data : {
                    'alasan' : alasan,
                },
                beforeSend: () => {
                    Swal.fire({
                        title: "Loading...",
                        text: "Harap Menunggu",
                        imageUrl: "{{ asset('assets/img/preloader.gif') }}",
                        showConfirmButton: false,
                        allowOutsideClick: false,
                    });
                }
            }).done(res => {
                if(res.warning){
                    Swal.fire('Peringatan', res.warning, 'warning');
                }
                
                if(res.success){
                    Swal.fire("Berhasil", res.success, 'success');
                    $(idTable).DataTable().ajax.reload();
                    $('#modal-tolak').modal('hide');
                    $('#alasan').val('');
                }
                if(res.errors){
                    res.errors.forEach(el => {
                        $('#form_result').append(`<div class="alert alert-danger">${el}</div>`);
                        $('#form_result2').append(`<div class="alert alert-danger">${el}</div>`);
                    })
                    Swal.fire('Gagal', 'Pembatalan Gagal', 'error');

                }
            }).catch(err => {
                if(err.responseJSON.error){
                    Swal.fire('Gagal', err.responseJSON.error, 'error');
                }else{
                    console.log(err.responseJSON.message)
                }
            })
        }
    });
}
const closeModal = () => {
    $('.modal').modal('hide');
}

const changeColor = (value, idElement) => $(idElement).text(value);

const changeNegosiasiDetail = (id, className, contentClassName) => {
    $(`.${className}`).removeClass('active');
    $(`.${contentClassName}`).removeClass('active');
    $(`#${id}`).addClass('active');

    if(id === "rincian"){
        $('#rincian-pesanan').addClass('active');
    }else{
        $('#history-negosiasi').addClass('active');
    }
}

//Filter Transaksi bagian Penyedia
const changeFilterDetail = (id, className, idChart) => {
    $(`.${className}`).removeClass('active');
    $(`#${id}`).addClass('active');

    if(id == "permintaan"){
        filterLaporan(idChart, '');
    }else if(id == "penawaran"){
        filterLaporan(idChart, '');
    }else if(id == "negosiasi"){
        filterLaporan(idChart, '');
    }else if(id == "invoice"){
        filterLaporan(idChart, '');
    }else if(id == "pembayaran"){
        filterLaporan(idChart, '');
    }
}

const filterLaporan = (idChart, url) => {
    statistikChart({
        id: idChart,
        title: 'Jumlah Permintaan Setahun Terakhir',
        data: [12, 20, 26, 23, 12, 15, 20, 22, 21, 10, 11, 24],
        labels: ['Januari', 'Februari', 'Maret', 'April', 'Mei', 'Juni', 'Juli', 'Agustus', 'September', 'Oktober', 'November', 'Desember'],
        namaSeri: 'Jumlah Laporan Jalanan yang Dilaporkan'
    });
}

//Filter transaksi bagian admin
const changeTextDetail = (
    firstPartValue,
    secondPartValue
) => {
    //first value
    $(`#${firstPartValue.name}_title`).text(firstPartValue.title);
    $(`#${firstPartValue.name}_amount`).text(firstPartValue.amount);
    $(`#${firstPartValue.name}_text`).text(firstPartValue.text);
    $(`#${firstPartValue.name}_icon`).html(firstPartValue.icon);
    $(`#${firstPartValue.name}_persen`).text(firstPartValue.persen);

    //second value
    $(`#${secondPartValue.name}_title`).text(secondPartValue.title);
    $(`#${secondPartValue.name}_amount`).text(secondPartValue.amount);
    $(`#${secondPartValue.name}_text`).text(secondPartValue.text);
    $(`#${secondPartValue.name}_icon`).html(secondPartValue.icon);
    $(`#${secondPartValue.name}_persen`).text(secondPartValue.persen);
}

//print page
const print = (id, cssLinks) => {
    var prtContent = document.getElementById(`${id}`);
    var winPrint = window.open('', '', 'left=0,top=0,width=800,height=900,toolbar=0,scrollbars=0,status=0');
    Object.values(cssLinks).forEach(link => {
        cssLinkTag = `<link rel="stylesheet" href="${link}">`
        winPrint.document.write(cssLinkTag);
    })
    winPrint.document.write(prtContent.innerHTML);
    winPrint.document.close();
    winPrint.focus();
    winPrint.print();
    // winPrint.close();
}

const setDropifyImage = (idElement, url) => {
    var fileDropper = $(`#${idElement}`).dropify();
    fileDropper = fileDropper.data('dropify');

    fileDropper.resetPreview();
    fileDropper.clearElement();
    fileDropper.settings['defaultFile'] = url;
    fileDropper.destroy();
    fileDropper.init();
}

const contactList = () => {
    var chatWidth = document.getElementById('left-chat').offsetWidth;
    const component = document.getElementById('left-chat');
    component.scrollIntoView({
        behavior: 'smooth'
    });
}
var max_data_count = 10;
var current_page = 1;
var current_data_count = 0;
var limit = 20;
const checkChat = (id,id_non_penyedia,profil,contact,nama,last_seen) => {
    $('.belum_pilih').remove();
    $('.sudah_pilih').removeClass('d-none');
    // $('.sudah_pilih').addClass('d-block');

    $('*.contact').removeClass('active');
    $('.'+contact).addClass('active');
    // $('.count'+contact).text('0');
    var chatWidth = document.getElementById('left-chat').offsetWidth;
    const component = document.getElementById('right-chat');
    component.scrollIntoView({
        behavior: 'smooth'
    });
    $('#non_penyedia_id').val(id_non_penyedia);
    $('#chat_id').val(id);
    (last_seen == 'null') ? $('.last_seen').html('Tidak Aktif') : $('.last_seen').html(last_seen);
    if(nama){
        $('.nama_user').html(nama);
    }else{
    }
    var nama_non_penyedia = $(`.contact-name${id}`).text();
    $('.nama_user').html(nama);
    $('.profil_user').attr('src',profil);
    $('.chat-list').empty();
    $('.modalContact').modal('hide');
    if(id != null){
        $.ajax({
            type: 'POST',
            url: `/chat/get/detail`,
            data:{
                'id':id,
                'non_penyedia_id' : id_non_penyedia,
            },
            success : function({data}){
                // console.log(data);
                if(data){
                    current_data_count = data.max_data_count;
                    for (let chat_message of data.chat_messages) {
                        $('.chat-list').append(appendGroup(chat_message));
                        scroll();
                    }
                    lastDate = data.chat_messages[data.chat_messages.length-1].chat_date;
                    $('.countcontact'+id).text('0');
                } else if(data.status == 500){
                    swal("Unexpected error!", "Terjadi kesalahan");
                }
            },
        })
        console.log(lastDate);
    }
    
}

function appendGroup(group){
    let html = ``;
    for(let message of group.messages){
        html+=appendGroupMessage(message);
    }
    return `
    <div class="chat-day"> 
        <div class="chat-date d-flex justify-content-center p-2">
            <span>${group.chat_date}</span>
        </div>
        ${html}
    </div>`
    ;  
}
function appendGroupMessage(message){
    return `
        <div class="${message.sent_by == "penyedia" ? "right-bubble-chat" : "left-bubble-chat"} bubble-chat">
        <div class="box">
            <div class="chat-content">
                <p>${message.content}</p>
            </div>
        </div>
        <div class="chat-time ${message.sent_by == "penyedia" && message.read_status == "1" ? 'read' : '' } ">
            <p>${message.sent_by == "penyedia" && message.read_status == "1" ? 'Dibaca' : '' }</p>
            ${message.content_sent_time}
        </div>
    </div>
    `;
}