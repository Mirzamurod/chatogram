app.controller('chatController', ['$scope', 'chatFactory', ($scope, chatFactory) => {
    // console.log('Salom');

    $scope.activeTab = 1
    $scope.onlineList = []
    $scope.roomList = []
    $scope.chatClicked = false
    $scope.chatName = ""
    $scope.roomId = ""
    $scope.message = ""
    $scope.messages = []

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

    $scope.newMessage = () => {
        socket.emit('newMessage', {
            message: $scope.message,
            roomId: $scope.roomId
        })

        $scope.messages[$scope.roomId].push({
            userId: $scope.users.googleId,
            username: $scope.user.name,
            surname: $scope.user.surname
        })

        $scope.message = ''
    }

    $scope.switchRoom = room => {
        $scope.chatName = room.name
        $scope.roomId = room.roomId
        $scope.chatClicked = true
        // $scope.$apply()
        chatFactory.getMessages(room.roomId).then(data => {
            console.log(data);
        });
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
