<div id="wrapper">
    
    @include('layouts.navbar')
    
    @include('layouts.left-sidebar')

    <div class="content-page">
        <div class="content">
            
            @yield('content')
            
        </div>
        
        @include('layouts.footer')
    </div>
</div>