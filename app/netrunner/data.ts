import { Post } from './types';

export const posts: Post[] = [
    {
        id: "THREAT-01",
        title: "Stack Overflow Attacks",
        desc: "Critical vulnerability analysis in legacy memory buffers.",
        img: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&q=80&w=600",
        content: "A buffer overflow occurs when data written to a buffer also corrupts data values in memory addresses adjacent to the destination buffer due to insufficient bounds checking. This can be exploited to inject executable code.",
        size: "128 KB",
        source: "KERN_LOGS"
    },
    {
        id: "CRYPTO-02",
        title: "Quantum Encryption",
        desc: "Post-silicon cryptography for the new age.",
        img: "https://images.unsplash.com/photo-1635070041078-e363dbe005cb?auto=format&fit=crop&q=80&w=600",
        content: "Quantum key distribution (QKD) uses quantum mechanics to guarantee secure communication. It enables two parties to produce a shared random secret key known only to them, which can then be used to encrypt and decrypt messages.",
        size: "1.2 GB",
        source: "Q_LABS"
    },
    {
        id: "AI-CORE-03",
        title: "Neural Net Backprop",
        desc: "Visualizing gradient descent in deep learning models.",
        img: "https://images.unsplash.com/photo-1620712943543-bcc4688e7485?auto=format&fit=crop&q=80&w=600",
        content: "Backpropagation is a widely used algorithm in training feedforward neural networks for supervised learning. It computes the gradient of the loss function with respect to the weights of the network for a single input–output example.",
        size: "4.5 TB",
        source: "AI_CORE"
    },
    {
        id: "VISUAL-04",
        title: "Ray Tracing Logic",
        desc: "Real-time photon simulation paths.",
        img: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&q=80&w=600",
        content: "Ray tracing is a rendering technique for generating an image by tracing the path of light as pixels in an image plane and simulating the effects of its encounters with virtual objects.",
        size: "800 MB",
        source: "GPU_CLUSTER"
    },
    {
        id: "MEM-05",
        title: "Garbage Collection",
        desc: "Heap management protocols.",
        img: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&q=80&w=600",
        content: "Garbage collection (GC) is a form of automatic memory management. The garbage collector attempts to reclaim memory which was allocated by the program, but is no longer referenced.",
        size: "64 KB",
        source: "HEAP_DUMP"
    },
    {
        id: "OS-06",
        title: "Deadlock Prevention",
        desc: "Mutex locks and semaphore states.",
        img: "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&q=80&w=600",
        content: "A deadlock is a state in which each member of a group is waiting for another member, including itself, to take action, such as sending a message or more commonly releasing a lock.",
        size: "32 KB",
        source: "SYS_MON"
    }
];
