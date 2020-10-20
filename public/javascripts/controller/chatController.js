app.controller('chatController', ['$scope', $scope => {
    // console.log('Salom');

    $scope.activeTab = 1
    $scope.onlineList = []
    $scope.roomList = []
    $scope.chatClicked = false
    $scope.chatName = ""

    const socket = io.connect('http://localhost:3000');

    socket.on('onlineList', users => {
        // console.log(users);
        $scope.onlineList = users
        $scope.$apply()
    })

    socket.on('roomList', rooms => {
        // console.log(rooms);
        $scope.roomList = rooms
        $scope.$apply()
    })

    $scope.switchRoom = room => {
        $scope.chatName = room.name
        $scope.chatClicked = true
        $scope.$apply()
    }

    $scope.newRoom = () => {
        // let randomName = Math.random().toString(36).substring(7)
        let roomName = window.prompt("Xonaning Ismini Kiriting...")
        if (roomName !== null && roomName !== "") {
            // console.log(randomName);
            socket.emit('newRoom', roomName)
        }
    }

    $scope.changeTab = tab => {
        $scope.activeTab = tab
    }
}])
