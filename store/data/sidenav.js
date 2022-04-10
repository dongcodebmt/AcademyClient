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
                "url": "/question/create",
                "unauthorized": ["Banned"]
            },
            {
                "name": "Hỏi",
                "url": "/question"
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
                "url": "/blog/create",
                "unauthorized": ["Banned"]
            },
            {
                "name": "Blog",
                "url": "/blog"
            }
        ]
    }
];