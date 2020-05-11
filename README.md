# How to run this source

```yarn install``` và ```yarn dev```

# Source description

Code structure được viết theo layered structure, 1 module (chia theo đối tượng của project) được phân làm 4 layer chính:

1. Routes: các api routes được list ở dây

2. Controllers:

- nhận req, res từ routes

- lấy các keys trong body

- gọi các functions trong các services, không nên tự xử lý business logic

- response cho clients

3. Services:

- nhận dữ liệu từ controllers

- xử lý business logic

- gọi các functions trong repositories

- có thể gọi thêm các functions trong fetches hoặc utils để xử lý

4. Repository:

- chịu trách nhiệm thao tác với database (aka chỉ nên import Sequelize ở đây)

- không xử lý business logic

- nên try catch khi connect với database

Ngoài ra còn một số thư mục phụ

- utils: define các utility functions xử lý tính toán nhỏ nhặt ở đây

- fetches: giao tiếp với API bên ngoài

- middlewares: define các middleware ở đây

# References:

Building code structure: https://www.coreycleary.me/project-structure-for-an-express-rest-api-when-there-is-no-standard-way/

Sequelize docs: https://sequelize.org/v5/

Final project description: https://hackmd.io/@nndkhoa9/wnc-ibprj
