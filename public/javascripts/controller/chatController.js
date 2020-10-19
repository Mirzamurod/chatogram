app.controller('chatController', ['$scope', $scope => {
    // console.log('Salom');

    $scope.activeTab = 1

    const socket = io.connect('http://localhost:3000');

    $scope.changeTab = tab => {
        $scope.activeTab = tab
    }
}])