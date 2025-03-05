<!-- Jquery -->
<script src="{{ asset('assets/js/jquery.js') }}"></script>

<!-- Vendor js -->
<script src="{{ asset('assets/js/vendor.min.js') }}"></script>

<!-- knob plugin -->
<script src="{{ asset('assets/libs/jquery-knob/jquery.knob.min.js') }}"></script>

<!--Morris Chart-->
<script src="{{ asset('assets/libs/morris-js/morris.min.js') }}"></script>
<script src="{{ asset('assets/libs/raphael/raphael.min.js') }}"></script>

<!-- Dashboard init js-->
<script src="{{ asset('assets/js/pages/dashboard.init.js') }}"></script>

<!-- App js -->
<script src="{{ asset('assets/js/app.min.js') }}"></script>
<script src= "{{asset('/js/app.js')}}"></script>

<!-- index js -->
<script defer src="{{ asset('assets/js/index.js') }}" ></script>
<script src="https://cdn.jsdelivr.net/npm/apexcharts"></script>

{{-- sweet alert --}}
<script src="{{ asset('/assets/libs/sweetalert2/sweetalert2.min.js') }}" ></script>

{{-- apex chart js --}}
<script src="{{ asset('assets/js/loadChart.js') }}"></script>

{{-- data tables --}}
<script src="{{asset('assets/libs/datatables/jquery.dataTables.min.js')}}"></script>
<script src="{{asset('assets/libs/datatables/dataTables.bootstrap4.js')}}"></script>
<script src="{{asset('assets/libs/datatables/dataTables.responsive.min.js')}}"></script>
<script src="{{asset('assets/libs/datatables/dataTables.buttons.min.js')}}"></script>
<script src="{{asset('assets/libs/datatables/buttons.bootstrap4.min.js')}}"></script>
<script src="{{asset('assets/libs/datatables/dataTables.keyTable.min.js')}}"></script>
<script src="{{asset('assets/libs/datatables/dataTables.select.min.js')}}"></script>

<script>
    $(document).ready(function(){
        $.ajax({
            url:'/sidebar/permintaan',
            success: function(response){
                if(response.permintaan != 0){
                    $('.count_permintaan').text(response.permintaan);
                    $('.count_permintaan').removeClass('d-none');
                }
                if(response.surat_po_pending != 0){
                    $('.count_surat_pesanan').text(response.surat_po_pending);
                    $('.count_surat_pesanan').removeClass('d-none');
                }

                if(response.invoice_belum_ada != 0){
                    $('.kirim_barang').text(response.invoice_belum_ada);
                    $('.kirim_barang').removeClass('d-none');
                }

                if(response.invoice_terima != 0){
                    $('.terima_bast').text(response.invoice_terima);
                    $('.terima_bast').removeClass('d-none');
                }

                if(response.invoice_kembalikan != 0){
                    $('.retur').text(response.invoice_kembalikan);
                    $('.retur').removeClass('d-none');
                }

                if(response.pembayaran_belum_ada != 0){
                    $('.pembayaran_belum_ada').text(response.pembayaran_belum_ada);
                    $('.pembayaran_belum_ada').removeClass('d-none');
                }

                if(response.pembayaran_tolak != 0){
                    $('.pembayaran_tolak').text(response.pembayaran_tolak);
                    $('.pembayaran_tolak').removeClass('d-none');
                }

                if(response.negosiasi_respon != 0){
                    $('.negosiasi_respon').text(response.negosiasi_respon);
                    $('.negosiasi_respon').removeClass('d-none');
                }

                if(response.pengiriman != 0){
                    $('.count_pengiriman').text(response.pengiriman);
                    $('.count_pengiriman').removeClass('d-none');
                }

                if(response.pengiriman_sampai != 0){
                    $('.count_pengiriman_sampai').text(response.pengiriman_sampai);
                    $('.count_pengiriman_sampai').removeClass('d-none');
                }

                if(response.penilaian != 0){
                    $('.count_penilaian').text(response.penilaian);
                    $('.count_penilaian').removeClass('d-none');
                }

                if(response.penilaian + response.pengiriman_sampai + response.pengiriman !=0 ){
                    $('.invoice').text(response.penilaian + response.pengiriman_sampai + response.pengiriman);
                    $('.invoice').removeClass('d-none');
                }

                if(response.platform_fee != 0){
                    $('.platform_fee').text(response.platform_fee);
                    $('.platform_fee').removeClass('d-none');
                }

                if(response.chat != 0){
                    $('.count_chat').text(response.chat);
                    $('.count_chat').removeClass('d-none');
                }
            }
        })
    })

</script>
@yield('js')
