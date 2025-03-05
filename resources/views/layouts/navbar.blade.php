<!-- Topbar Start -->
<div class="navbar-custom" style="background-color: #fff;">

    <!-- LOGO -->
    <div class="logo-box">
        <a href="" class="logo logo-dark text-center">
            <span class="logo-lg">
                <img src="{{ asset('assets/img/logo.webp') }}" alt="" height="50">
            </span>
            <span class="logo-sm">
                <img src="{{ asset('assets/img/logo.webp') }}" alt="" height="18">
            </span>
        </a>
        <a href="" class="logo logo-light text-center">
            <span class="logo-lg">
                <img src="{{ asset('assets/img/logo.webp') }}" alt="" height="50">
            </span>
            <span class="logo-sm">
                <img src="{{ asset('assets/img/logo.webp') }}" alt="" height="18">
            </span>
        </a>
    </div>

    <ul class="list-unstyled mobile-menu topnav-menu topnav-menu-left mb-0">
        <li>
            <button class="button-menu-mobile disable-btn waves-effect">
                <i class="fe-menu"></i>
            </button>
        </li>

    </ul>

    <ul class="list-unstyled topnav-menu mb-0 d-flex flex-wrap justify-content-end">

        <li class="d-none d-sm-block " style="justify-self: flex-start;">
            <form class="app-search">
                <div class="app-search-box">
                    <div class="input-group">
                        <input type="text" class="form-control" placeholder="Cari produk, kategori, dan lain lain...">
                        <div class="input-group-append">
                            <button class="btn" type="submit">
                                <i class="fe-search"></i>
                            </button>
                        </div>
                    </div>
                </div>
            </form>
        </li>

        <li class="dropdown notification-list">
            <a href="javascript:void(0);" class="nav-link right-bar-toggle waves-effect">
                <i class="mdi mdi-chat-outline noti-icon"></i>
            </a>
        </li>
        <li class="dropdown notification-list">
            <a href="javascript:void(0);" class="nav-link right-bar-toggle waves-effect">
            </a>
        </li>

        <li class="dropdown notification-list">
            <a class="nav-link dropdown-toggle nav-user mr-0 waves-effect" data-toggle="dropdown" href="#" role="button" aria-haspopup="false" aria-expanded="false">
                <img src="" class="rounded-circle">
                <span class="pro-user-name ml-1">
                     <i class="mdi mdi-chevron-down"></i>
                </span>
            </a>
            <div class="dropdown-menu dropdown-menu-right profile-dropdown ">
                <!-- item-->
                <div class="dropdown-header noti-title">
                    <h6 class="text-overflow m-0">Welcome !</h6>
                </div>

                <div class="dropdown-divider"></div>

                <!-- item-->
                <a href="#" onclick="event.preventDefault(); document.getElementById('logout-form').submit();" class="dropdown-item notify-item">
                    <i class="fe-log-out"></i>
                    <span>Logout</span>
                </a>
                <form id="logout-form" action=""style="display: none;">
                </form>
            </div>
        </li>
    </ul>

</div>
<!-- end Topbar -->
