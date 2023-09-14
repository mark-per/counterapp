import { Box, Typography, Link } from '@mui/material';

export default function About() {
    return (
        <Box p={4} mt={5}>

            <Typography variant="h4" gutterBottom>
                About P-Nut Counter
            </Typography>

            <Typography variant="body1" gutterBottom>
                P-Nut Counter is a web application that allows users to create, read, update, delete and
                persist counters across sessions. It was built using React, Spring Boot and MySQL.
            </Typography>

            <Typography variant="h5" gutterBottom>
                Functionality
            </Typography>

            <Typography variant="body1" gutterBottom>
                The frontend UI is built using React and provides a smooth user experience via efficient
                rendering and state management with hooks like useState and useEffect. Requests are made
                to the backend REST API built with Spring Boot to perform CRUD operations on counters stored
                in the MySQL database.
            </Typography>

            <Typography variant="h5" gutterBottom>
                Code Quality
            </Typography>

            <Typography variant="body1" gutterBottom>
                The frontend codebase (built with React) and backend codebase (built with Spring Boot) are
                kept in separate repositories for improved separation of concerns and modularity.

                The React frontend follows best practices like:
                <ul>
                    <li>Modular components with separation of concerns</li>
                    <li>Custom hooks encapsulating reusable stateful logic</li>
                    <li>Functional components with React hooks for state management</li>
                </ul>

                The Spring Boot backend follows principles like:
                <ul>
                    <li>Layered architecture with controllers, services, repositories</li>
                    <li>Database logic abstracted into repositories</li>
                    <li>Dependency injection for loose coupling</li>
                </ul>
            </Typography>

            <Typography variant="h5" gutterBottom>
                Technical Decisions
            </Typography>

            <Typography variant="body1" gutterBottom>
                <b>Frontend</b>
                <ul>
                    <li>
                        <b>React</b> - Provides fast rendering through virtual DOM diffing and enables effective state management through hooks.
                    </li>
                    <li>
                        <b>Material UI</b> - Component library with pre-built React components for responsive styling.
                    </li>
                </ul>

                <b>Backend</b>
                <ul>
                    <li>
                        <b>Spring Boot</b> - Framework for building API's and microservices, provides dependency injection, database integration, and rapid application development.
                    </li>
                    <li>
                        <b>Spring Data JPA</b> - Makes it easy to implement JPA based repositories and connect to SQL databases like MySQL.
                    </li>
                    <li>
                        <b>MySQL</b> - Open source relational database for persisting counter data.
                    </li>
                </ul>
            </Typography>

            <Typography variant="h5" gutterBottom>
                Features
            </Typography>

            <Typography variant="body1" gutterBottom>
                <ul>
                    <li>Create new counters</li>
                    <li>Increment and decrement counter values</li>
                    <li>Delete counters</li>
                    <li>Persist counter data across sessions</li>
                    <li>Concurrent multi-device access with counter ID</li>
                    <li>Validation on backend for data integrity</li>
                    <li>Docker config for containerized deployment</li>
                </ul>
            </Typography>

            <Typography variant="h5" gutterBottom>
                Future Work
            </Typography>

            <Typography variant="body1" gutterBottom>
                Some ideas for future improvement:
                <ul>
                    <li>User authentication</li>
                    <li>Group counters into projects</li>
                    <li>Progressive web app features</li>
                    <li>Visual graphs and analytics</li>
                </ul>
            </Typography>

        </Box>
    );
}