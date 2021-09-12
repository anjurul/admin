<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">
    <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1">

        <!-- style -->
        <link rel="stylesheet" href="{{asset('css/app.css')}}">
        <link rel="stylesheet" href="{{asset('css/style.css')}}">
        <link href="https://fonts.googleapis.com/css2?family=Roboto+Condensed:wght@300;400&display=swap" rel="stylesheet">
        <link rel="stylesheet" href="https://unpkg.com/react-quill@1.3.3/dist/quill.snow.css">

        
    </head>
    <body class="antialiased">
        <div class="container">
            <div class="row d-flex justify-content-center">
                <div class="col-md-6 text-center mt-5">
                <div class="card">
                    <div class="card-body">
                        <h3>Admin Login</h3><hr>
                        <input id="userName" class="form-control" type="text" placeholder="User Name"><br>
                        <input id="password" class="form-control" type="password" placeholder="Password"><br>
                        <button id="loginBtn" onclick="AdminLogin()" class="btn normal-btn btn-block">Login</button>
                    </div>
                </div>
                </div>
            </div>
        </div>

        <script type="text/javascript">
            function AdminLogin() {
                var UserName=document.getElementById('userName').value;
                var Password=document.getElementById('password').value;
                
                var xhttp=new XMLHttpRequest();
                xhttp.onreadystatechange=function () {
                        if(this.readyState==4 && this.status==200){
                            if(this.responseText=="1"){
                                window.location.href="/";
                            }
                            else{
                                alert("Login Fail")
                            }
                        }
                }
                xhttp.open("GET","/onLogin/"+UserName+"/"+Password,true);
                xhttp.send();
            }
        </script>
        
    </body>
    
</html>
