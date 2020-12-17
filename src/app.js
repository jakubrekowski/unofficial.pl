"use strict";

import axios from 'axios'
import projects from './projects'

const temp = document.querySelector(".proj-temp")
const projectsList = document.querySelector(".projects")
const projLink = document.querySelector('.proj-link')
const projImg = document.querySelector('.proj-link')
const projTitle = document.querySelector('.proj-link')
const projDescription = document.querySelector('.proj-link')
const projUsed = document.querySelector('.proj-link')

try {
    for (let i = 0; i < projects.length; i++) {

        axios.get(`https://api.github.com/repos/${projects[i].repositoryOwner}/${projects[i].repositoryName}`)
            .then(response => {
                let img;

                if (projects[i].imageExists) {
                    img = `<img class="proj-img w-full h-48" src="${projects[i].imageURL}" />`
                } else {
                    img = ''
                }

                let projectCard =
                    `<a class="proj-link" href="${response.data.html_url}">
                        <div class="bg-gray-900 mb-6 project">
                            ${img}
                            <div class="p-5">
                                <h3 class="proj-name text-2xl text-yellow">${response.data.name}</h3>
                                <p class="text-xl proj-description">${response.data.description}</p>
                                <div class="proj-used text-xl text-darker-gray mt-3">${response.data.language}</div>
                            </div>
                        </div>
                    </a>`

                projectsList.innerHTML += projectCard
            })
    }
} catch (error) {
    console.error(error);
}
