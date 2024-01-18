/**
 * 字节三面
 * 
 * 
 * 
 */
const input = [
    'A-B-C',
    'A-B-D',
    'D-E-F',
]

const output = [
    {
        node: 'A',
        path: 'A',
        children: [
            {
                node: 'B',
                path: 'A-B',
                children: [
                    {
                        node: 'C',
                        path: 'A-B-C',
                    },
                    {
                        node: 'D',
                        path: 'A-B-D',
                    }
                ]
            }
        ]
    },
    {
        node: 'D',
        path: 'D',
        children: [
            {
                node: 'E',
                path: 'D-E',
                children: [
                    {
                        node: 'F',
                        path: 'D-E-F',
                    },
                    {
                        node: 'D',
                        path: 'A-B-D',
                    }
                ]
            }
        ]
    }
]