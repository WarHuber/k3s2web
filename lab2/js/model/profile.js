const data = sessionStorage.getItem('currentUser');

if (data) {
    const profileData = JSON.parse(data);

    document.getElementById('profile-table').innerHTML = `
    <thead>
        <tr>
            <th>Field</th>
            <th>Value</th>
        </tr>
    </thead>
    <tbody>
        <tr>
            <td>Name</td>
            <td>${profileData.name}</td>
        </tr>
        <tr>
            <td>Email</td>
            <td>${profileData.email}</td>
        </tr>
        <tr>
            <td>Gender</td>
            <td>${profileData.gender}</td>
        </tr>
        <tr>
            <td>Date of Birth</td>
            <td>${profileData.dob}</td>
        </tr>
    </tbody>    
    `;
} else {
    console.log('No profile data found.');
}