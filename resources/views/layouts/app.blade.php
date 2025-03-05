<!DOCTYPE html>
<html lang="en">
    <head>
        @include('layouts.head')
    </head>

    <body>
        <!-- Pre-loader -->
        <div id="preloader">
            <div id="status">
                <div class="spinner">Loading...</div>
            </div>
        </div>

        {{-- Begin Page --}}
        @include('layouts.wrapper')
        {{-- End page wrapper --}}

        @include('layouts.script')
    </body>
</html>
