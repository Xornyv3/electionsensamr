let allowedVoters = [];
const votes = {};
let currentGroup = "";

fetch('allowedVoters.json')
    .then(response => response.json())
    .then(data => {
        allowedVoters = data; // Load data into the allowedVoters variable
    })
    .catch(error => console.error('Error fetching the allowed voters:', error));

function authenticate() {
    const firstNameInput = document.getElementById('firstName').value.toUpperCase();
    const lastNameInput = document.getElementById('lastName').value.toUpperCase();
    const groupSelect = document.getElementById('groupSelect').value;
    const authMessage = document.getElementById('authMessage');

    const voter = allowedVoters.find(v =>
        v.firstName === firstNameInput && v.lastName === lastNameInput && v.group === groupSelect
    );

    if (voter) {
        authMessage.textContent = "Authenticated! You can now vote.";
        currentGroup = voter.group; // Store the group of the authenticated voter
        document.getElementById('voteSection').style.display = 'block';
        displayCandidates(currentGroup);
    } else {
        authMessage.textContent = "You are not authorized to vote.";
        document.getElementById('voteSection').style.display = 'none';
    }
}

function displayCandidates(group) {
    const candidatesDiv = document.getElementById('candidates');
    candidatesDiv.innerHTML = ''; // Clear previous candidates

    if (group === "Group 1") {
        candidatesDiv.innerHTML = `
            <label>
                <input type="radio" name="delegate" value="Delegate 1A" required /> Delegate 1A
            </label>
            <label>
                <input type="radio" name="delegate" value="Delegate 1B" required /> Delegate 1B
            </label>
        `;
    } else if (group === "Group 2") {
        candidatesDiv.innerHTML = `
            <label>
                <input type="radio" name="delegate" value="Delegate 2A" required /> Delegate 2A
            </label>
            <label>
                <input type="radio" name="delegate" value="Delegate 2B" required /> Delegate 2B
            </label>
        `;
    } else if (group === "Group 3") {
        candidatesDiv.innerHTML = `
            <label>
                <input type="radio" name="delegate" value="Delegate 3A" required /> Delegate 3A
            </label>
            <label>
                <input type="radio" name="delegate" value="Delegate 3B" required /> Delegate 3B
            </label>
        `;
    } else if (group === "Group 4") {
        candidatesDiv.innerHTML = `
            <label>
                <input type="radio" name="delegate" value="Delegate 4A" required /> Delegate 4A
            </label>
            <label>
                <input type="radio" name="delegate" value="Delegate 4B" required /> Delegate 4B
            </label>
        `;
    }
}

document.getElementById('voteForm').addEventListener('submit', function(event) {
    event.preventDefault();
    const firstNameInput = document.getElementById('firstName').value.toUpperCase();
    const lastNameInput = document.getElementById('lastName').value.toUpperCase();
    const groupSelect = document.getElementById('groupSelect').value;
    const selectedDelegate = document.querySelector('input[name="delegate"]:checked').value;

    const fullName = `${firstNameInput} ${lastNameInput}`;
    const voter = allowedVoters.find(v =>
        v.firstName === firstNameInput && v.lastName === lastNameInput && v.group === groupSelect
    );

    if (voter) {
        alert(voter.hasVoted);
        if (voter.hasVoted === "NO") {
            voter.hasVoted = "YES";
            votes[fullName] = selectedDelegate;
            document.getElementById('voteMessage').textContent = "Thank you for your vote!";
        } else {
            document.getElementById('voteMessage').textContent = "You have already voted.";
        }
    } else {
        document.getElementById('voteMessage').textContent = "Voter not found.";
    }
});