const status_filter = {
    value1: null,
    value2: null,
    value3: null 
}

const formData = {
    tipe_produk: 'ready',
    status_barang: 'tersedia'
};

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

const filterInfo = (value) => {
    let valueCount = 0;
    let statusObject = {};
    
    for(key in value.statusValue){
        if(value.statusValue.hasOwnProperty(key)){
            ++valueCount;
        }
    }
    
    Object.values(status_filter).forEach((el, index) => {
        if(index < valueCount){
            if(isEmpty(el)){
                if(index == 0){
                    changeFirstValue(value.statusValue.value1);
                }else if(index == 1){
                    changeSecondValue(value.statusValue.value2);
                }else{
                    changeThirdValue(value.statusValue.value3);
                }
            }
        }
    })
    
    const statusDataArray = Object.values(status_filter).filter(el => el != null);
    
    statusDataArray.forEach((el, index) => {
        statusObject[`data${(index+1)}`] = el;
    })
    
    console.log(statusObject)
}

const openModal = (partClassName) => {
    openFirstPart(partClassName);        
    defaultState();
}

const openFirstPart = (partClassName) => {
    $(`.${partClassName}`).removeClass('active');
    $(`#part1`).addClass('active');
    
    defaultState();
}

const openSecondPart = (partClassName) => {
    $(`.${partClassName}`).removeClass('active');
    $('#part2').addClass('active');
    
    $('#btnAction').val('submit');
    $('#btnAction').text('Tambah Data');
    
    $('#btnBack').val('back');
    $('#btnBack').text('Back');
}

const defaultState = () => {
    $('#btnAction').val('next');
    $('#btnAction').text('Next');
    
    $('#btnBack').val('close');
    $('#btnBack').text('Close');
}

const actionForm = (value, partClassName, idForm) => {
    if(value === "next"){
        
        if(formData.tipe_produk === "ready"){
            $('#ready_state').addClass('d-none');
        }else if(formData.tipe_produk === "custom"){
            $('#ready_state').removeClass('d-none');
        }
        
        openSecondPart(partClassName);
    }else if(value === "submit"){
        insertData(idForm);
        
        // defaultState();
    }else if(value === "edit"){
        editData('Coba')
        
        // defaultState();
    }
}

const insertData = (idForm) => {
    var dataForm = new FormData($(`#${idForm}`)[0]);
    console.log($('#foto-produk').val());
}

const editData = (formData) => {
    
}

const changeTipeProduk = (id, className, value) => {
    $(`.${className}`).removeClass('active');
    $(`#${id}`).addClass('active');
    
    formData.tipe_produk = value;
}

const changeStatusBarang = (id, className, value) => {
    $(`.${className}`).removeClass('active');
    $(`#${id}`).addClass('active');
    
    formData.status_barang = value;
}

const closeModal = (button_value, partClassName) => {
    if(button_value === "close"){
        $('#modal-product').modal('hide');
    }else if(button_value === "back"){
        openFirstPart(partClassName);
    }
}

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
        cssLinkTag = `<link rel="stylesheet" href="{{ asset(${link}) }}">`
        winPrint.document.write(cssLinkTag);
    })
    winPrint.document.write(prtContent.innerHTML);
    winPrint.document.close();
    winPrint.focus();
    winPrint.print();
    // winPrint.close();
}

const contactList = () => {
    var chatWidth = document.getElementById('left-chat').offsetWidth;
    const component = document.getElementById('left-chat');
    component.scrollIntoView({
        behavior: 'smooth'
    });
}

const checkChat = () => {
    var chatWidth = document.getElementById('left-chat').offsetWidth;
    const component = document.getElementById('right-chat');
    component.scrollIntoView({
        behavior: 'smooth'
    });
}