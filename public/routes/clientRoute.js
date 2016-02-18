angular.module('rgchat')
.config(['$routeProvider', function($routeProvider) {
    console.log('aaaa');
    //Module의 config API를 사용하면 서비스 제공자provider에 접근할 수 있다. 여기선 $route 서비스 제공자를 인자로 받아온다.
    // $routeProvider
    // //$routeProvider의 when 메소드를 이용하면 특정 URL에 해당하는 라우트를 설정한다. 이때 라우트 설정객체를 전달하는데 <ng-view>태그에 삽입할 탬플릿에 해당하는 url을 설정객체의 templateUrl 속성으로 정의한다.
    // .when('/client/:token', {
    //     templateUrl: 'client.html',
    //     controller: 'clientController'
    // });
}]);
