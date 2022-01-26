const drawPosts = (data) => {
	const posts = document.querySelector("#posts");

	posts.innerHTML = "";

	data.forEach((post, index) => {
		posts.innerHTML += `
            <div class="wrapper__post">
                <p class="wrapper__postItem">userId: ${post.userId}</p>
                <p class="wrapper__postItem">id: ${post.id}</p>
                <p class="wrapper__postItem">title: ${post.title}</p>
                <p class="wrapper__postItem">body: ${post.body}</p>
            </div>
        `;
	});

	drawButtons(data);
};

const drawButtons = (data) => {
	const pagination = document.querySelector("#pagination");

	pagination.innerHTML = "";
	data.forEach((post, index) => {
		pagination.innerHTML += `
			<button id="${index}" class="wrapper__button">${index + 1}</button>
		`;
	});
};

const init = async () => {
	let response;
	try {
		response = await (
			await fetch("https://jsonplaceholder.typicode.com/posts")
		).json();
	} catch {}

	const data = {
		posts: [],
	};

	const sizeOfMassive = 10;

	data.posts = response.reduce(
		(firstMassive, secondMassive) => {
			if (firstMassive[firstMassive.length - 1].length === sizeOfMassive) {
				firstMassive.push([]);
			}

			firstMassive[firstMassive.length - 1].push(secondMassive);

			return firstMassive;
		},
		[[]]
	);

	const pagination = document.querySelector("#pagination");

	pagination.addEventListener("click", (event) => {
		if (event.target.tagName === "BUTTON") {
			let buttonId = event.target.id;

			let indexOfTenPosts = data.posts.findIndex((post, index, array) => {
				if (index === +buttonId) {
					return index;
				}
			});

			if (indexOfTenPosts > 0) {
				drawPosts(data.posts[indexOfTenPosts]);
			} else {
				drawPosts(data.posts[0]);
			}
		}
	});

	drawPosts(data.posts[0]);
};

init();
