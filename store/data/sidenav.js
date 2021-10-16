export default [
    {
        "name": "Home",
        "url": "/",
        "icon": "home"
    },
    {
        "name": "Khóa học",
        "url": "/course",
        "icon": "book"
    },
    {
        "name": "Hỏi & Đáp",
        "id": "question",
        "icon": "question-circle",
        "submenu": [
            {
                "name": "Viết câu hỏi",
                "url": "/question/create"
            },
            {
                "name": "Hỏi",
                "url": "/question/list"
            }
        ]
    },
    {
        "name": "Blog",
        "id": "blog",
        "icon": "blog",
        "submenu": [
            {
                "name": "Viết blog",
                "url": "/blog/create"
            },
            {
                "name": "Hỏi",
                "url": "/blog/list"
            }
        ]
    },
    {
        "name": "Đăng xuất",
        "url": "/signout",
        "icon": "sign-out-alt"
    }
];